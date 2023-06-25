import readline from 'readline';
import getUsername from './utils/getUsername.js';
import parseInput from './utils/parseInput.js';
import getNewPath from './navigation/getNewPath.js';
import getUpPath from './navigation/getUpPath.js';
import getDirectoryInfo from './navigation/getDirectoryInfo.js';
import getOsInfo from './os/getOsInfo.js';
import getHash from './hash/getHash.js';
import { commands } from './data/commands.js';

const username = getUsername();
const systemPath = process.cwd();

let currentDirectory = systemPath;

const { navigaton, osCommands, hash } = commands;

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
    case navigaton.cd:
      try {
        currentDirectory = await getNewPath(args, currentDirectory);
      } catch {
        console.log('File not found');
      }
      break;
    case navigaton.up:
      currentDirectory = getUpPath(currentDirectory, systemPath);
      break;
    case navigaton.ls:
      await getDirectoryInfo(currentDirectory);
      break;
    case osCommands.name:
      getOsInfo(args);
      break;
    case hash:
      await getHash(currentDirectory, args);
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
  const { command, args } = parseInput(input);
  await manageCommand(command, args);
  rl.setPrompt(`You are currently in ${currentDirectory}\n`);
  rl.prompt();
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
