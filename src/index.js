import readline from 'readline';
import getUsername from './utils/getUsername.js';
import getCommand from './utils/getCommand.js';
import getNewPath from './navigation/getNewPath.js';
import getUpPath from './navigation/getUpPath.js';
import getDirectoryInfo from './navigation/getDirectoryInfo.js';
import getOsInfo from './os/getOsInfo.js';

const username = getUsername();
const systemPath = process.cwd();

let currentDirectory = systemPath;

console.log(`Welcome to the File Manager, ${username}!\n`);
console.log('You can see the availble commands below:\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt(`You are currently in ${currentDirectory}\n`);
rl.prompt();

const manageCommand = async (command, args) => {
  switch (command) {
    case 'cd':
      try {
        currentDirectory = await getNewPath(args, currentDirectory);
      } catch {
        console.log('There is no such file\n');
      }
      break;
    case 'up':
      currentDirectory = getUpPath(currentDirectory, systemPath);
      break;
    case 'ls':
      await getDirectoryInfo(currentDirectory);
      break;
    case 'os':
      getOsInfo(command, args);
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log('Invalid input\n');
      break;
  }
};

rl.on('line', async (input) => {
  const { command, args } = getCommand(input);
  await manageCommand(command, args);
  rl.setPrompt(`You are currently in ${currentDirectory}\n`);
  rl.prompt();
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
