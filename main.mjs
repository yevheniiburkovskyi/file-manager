import readline from "readline";
import path from "path";
import os from "os";
import { getCommandArg } from "./src/getCommandArg.js";
import { showContentTable } from "./src/showContentTable.js";
import fsp from "fs/promises";
import { readFile } from "./src/readFile.js";
import { copyFile } from "./src/copyFile.js";
import { calculateHash } from "./src/calculateHash.js";
import { compressFile } from "./src/compressFile.js";
import { decompressFile } from "./src/decompressFile.js";

const startFileManager = () => {
  const args = process.argv.slice(2);

  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  const userHomeDirectory = os.homedir();

  let currentPath = userHomeDirectory;

  let compressedFileExtension = ".txt";

  if (usernameArg) {
    const username = usernameArg.split("=")[1];

    console.log(`Welcome to the File Manager,${username}!`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (input) => {
      const command = getCommandArg(input, 0);
      const targetPath = getCommandArg(input, 1);
      try {
        switch (command) {
          case ".exit":
            return rl.close();

          case "up":
            if (currentPath !== userHomeDirectory) {
              const parentPath = path.resolve(currentPath, "..");
              currentPath = parentPath;
            }

            break;

          case "cd":
            const createdPath = path.join(currentPath, targetPath);

            await fsp.access(createdPath);

            currentPath = createdPath;

            break;

          case "ls":
            showContentTable(currentPath);

            break;

          case "cat":
            const readTargetPath = path.join(targetPath);

            await fsp.access(readTargetPath);

            await readFile(readTargetPath);

            break;
          case "add":
            const addTargetPath = path.join(currentPath, targetPath);

            await fsp.writeFile(addTargetPath, "");

            break;

          case "rn":
            const oldNamePath = path.join(targetPath);

            const updatedNamePath = path.join(
              path.resolve(oldNamePath, ".."),
              getCommandArg(input, 2)
            );

            await fsp.rename(oldNamePath, updatedNamePath);

            break;

          case "cp": {
            const copySourcePath = path.join(targetPath);

            const copyDestinationPath = path.join(
              getCommandArg(input, 2),
              path.basename(copySourcePath)
            );

            const fileStats = await fsp.stat(copySourcePath);

            if (fileStats.isDirectory()) {
              throw Error;
            }

            await copyFile(copySourcePath, copyDestinationPath);

            break;
          }
          case "mv":
            const moveSourcePath = path.join(targetPath);

            const moveDestinationPath = path.join(
              getCommandArg(input, 2),
              path.basename(moveSourcePath)
            );

            const fileStats = await fsp.stat(moveSourcePath);

            if (fileStats.isDirectory()) {
              throw Error;
            }

            await copyFile(moveSourcePath, moveDestinationPath, true);

            break;

          case "rm":
            const removeSourcePath = path.join(targetPath);

            const removeFileStats = await fsp.stat(removeSourcePath);

            if (removeFileStats.isDirectory()) {
              throw Error;
            }

            await fsp.unlink(removeSourcePath);

            break;

          case "hash":
            const hashFilePath = path.join(targetPath);

            const hashFileStats = await fsp.stat(hashFilePath);

            if (hashFileStats.isDirectory()) {
              throw Error;
            }

            await calculateHash(hashFilePath);

            break;
          case "compress":
            const compressSourcePath = path.join(targetPath);

            compressedFileExtension = path.extname(compressSourcePath);

            const compressDestinationPath = path.join(
              getCommandArg(input, 2),
              `${path.basename(compressSourcePath, compressedFileExtension)}.br`
            );

            const compressFileStats = await fsp.stat(compressSourcePath);

            if (compressFileStats.isDirectory()) {
              throw Error;
            }

            await compressFile(compressSourcePath, compressDestinationPath);

            break;

          case "decompress": {
            const decompressSourcePath = path.join(targetPath);

            const decompressDestinationPath = path.join(
              getCommandArg(input, 2),
              `${path.basename(
                decompressSourcePath,
                path.extname(decompressSourcePath)
              )}${compressedFileExtension}`
            );

            const decompressFileStats = await fsp.stat(decompressSourcePath);

            if (decompressFileStats.isDirectory()) {
              throw Error;
            }

            await decompressFile(
              decompressSourcePath,
              decompressDestinationPath
            );

            break;
          }

          default:
            console.error("Invalid input");
        }
      } catch (error) {
        console.error(error);
        console.error("Operation failed");
      }

      console.log(`You are currently in ${currentPath}`);
    });

    rl.on("close", () => {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    });
  } else {
    console.log("No username provided.");
  }
};

startFileManager();
