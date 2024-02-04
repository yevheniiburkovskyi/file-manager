import os from "os";

export const getOSInfo = (command) => {
  switch (command) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;
    case "--cpus":
      const cpus = os.cpus();

      console.log(`Overall amount of CPUs: ${cpus.length}`);

      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}:`);
        console.log(`  Model: ${cpu.model}`);
        console.log(`  Speed: ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;
    case "--homedir":
      console.log(os.homedir());
      break;
    case "--username":
      console.log(os.userInfo().username);
      break;
    case "--architecture":
      console.log(os.arch());
      break;
    default:
      throw Error;
  }
};
