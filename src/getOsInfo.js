import os from "os";
import { OS_COMMANDS } from "./constants/constants.js";

export const getOSInfo = (command) => {
  switch (command) {
    case OS_COMMANDS.eol:
      console.log(`Current EOL is: ${JSON.stringify(os.EOL)}`);
      break;
    case OS_COMMANDS.cpus:
      const cpus = os.cpus();

      console.log(`Overall amount of CPUs: ${cpus.length}`);

      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`);
        console.log(`Model: ${cpu.model}`);
        console.log(`Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;
    case OS_COMMANDS.homedir:
      console.log(`Homedir: ${os.homedir()}`);
      break;
    case OS_COMMANDS.username:
      console.log(`Username: ${os.userInfo().username}`);
      break;
    case OS_COMMANDS.architecture:
      console.log(`Architecture: ${os.arch()}`);
      break;
    default:
      throw Error;
  }
};
