import readline from 'readline';
import getUsername from './utils/getUsername.js';
import parseInput from './utils/parseInput.js';
import getNewPath from './navigation/getNewPath.js';
import getUpPath from './navigation/getUpPath.js';
import getDirectoryInfo from './navigation/getDirectoryInfo.js';
import getOsInfo from './os/getOsInfo.js';
import getHash from './hash/getHash.js';
import { commands } from './data/commands.js';
import compressFile from './zip/compressFile.js';
import decompressFile from './zip/decompressFile.js';
import getHelp from './help/getHelp.js';

import readFile from './files/readFile.js';
import copyFile from './files/copyFile.js';
import createFile from './files/createFile.js';
import deleteFile from './files/deleteFile.js';
import moveFile from './files/moveFile.js';
import renameFile from './files/renameFile.js';

const username = getUsername();
const systemPath = process.cwd();

let currentDirectory = systemPath;

const { navigaton, osCommands, hash, compress, decompress, file } = commands;

console.log('\x1b[32m%s\x1b[0m', `Welcome to the File Manager, ${username}!\n`);
console.log('\x1b[33m%s\x1b[0m', 'Print .help to see available commands\n');

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
    case compress:
      await compressFile(currentDirectory, args);
      break;
    case decompress:
      await decompressFile(currentDirectory, args);
      break;
    case file.cat:
      readFile(currentDirectory, args);
      break;
    case file.add:
      await createFile(currentDirectory, args);
      break;
    case file.rn:
      await renameFile(currentDirectory, args);
      break;
    case file.cp:
      await copyFile(currentDirectory, args);
      break;
    case file.mv:
      await moveFile(currentDirectory, args);
      break;
    case file.rm:
      await deleteFile(currentDirectory, args);
      break;
    case '.help':
      getHelp();
      break;
    case '.exit':
      rl.close();
      break;
    default:
      console.log(
        '\x1b[31m%s\x1b[0m',
        'Operation failed. Print .help to see available commands\n'
      );
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
  console.log(
    '\x1b[32m%s\x1b[0m',
    `Thank you for using File Manager, ${username}, goodbye!`
  );
  process.exit();
});
