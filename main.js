import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";

const startFileManager = () => {
  const args = process.argv.slice(2);

  const usernameArg = args.find((arg) => arg.startsWith("--username="));

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const userHomeDirectory = os.homedir();

  if (usernameArg) {
    const username = usernameArg.split("=")[1];

    console.log(`Welcome to the File Manager,${username}!`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (input) => {
      const command = input.trim();
      console.log(`You are currently in ${userHomeDirectory}`);

      switch (input) {
        case ".exit":
          return rl.close();
      }
    });

    rl.on("close", () => {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    });
  } else {
    console.log("No username provided.");
  }
};

startFileManager();
