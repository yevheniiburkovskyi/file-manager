import readline from 'readline';
import getUsername from './utils/getUsername.js';
import getSystemPath from './utils/getSystemPath.js';

const username = getUsername();
const systemPath = getSystemPath();

console.log(`Welcome to the File Manager, ${username}!\n`);
console.log('You can see the availble commands below:\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt(`You are currently in ${systemPath}\n`);
rl.prompt();

const manageCommand = (command) => {
  switch (command) {
    case '.exit':
      rl.close();
      break;
    default:
      console.log('Invalid input\n');
      break;
  }
};

rl.on('line', (command) => {
  const clearCommand = command.trim();
  manageCommand(clearCommand);
});

process.on('exit', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit();
});
