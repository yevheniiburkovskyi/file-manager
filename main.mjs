import readline from "readline";
import path from "path";
import os from "os";
import { getCommandArg } from "./src/getCommandArg.js";
import { showContentTable } from "./src/showContentTable.js";
import fsp from "fs/promises";

const startFileManager = () => {
  const args = process.argv.slice(2);

  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  const userHomeDirectory = os.homedir();

  let currentPath = userHomeDirectory;

  if (usernameArg) {
    const username = usernameArg.split("=")[1];

    console.log(`Welcome to the File Manager,${username}!`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (input) => {
      const command = getCommandArg(input, 0);

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
          const targetPath = getCommandArg(input, 1);

          const createdPath = path.join(currentPath, targetPath);

          try {
            await fsp.access(createdPath);

            currentPath = createdPath;
          } catch {
            console.error("Operation failed");
          }

          break;

        case "ls":
          showContentTable(currentPath);

          break;

        default:
          console.error("Invalid input");
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
