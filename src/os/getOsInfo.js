import os from 'os';
import commands from '../data/commands.js';

const getOsInfo = (args) => {
  if (!args.length) {
    console.log('Invalid os flag');
    return;
  }

  const arg = args[0];
  const {
    osCommands: { flags },
  } = commands;

  switch (arg) {
    case flags.EOL:
      const formattedEOL = JSON.stringify(os.EOL);
      console.log(formattedEOL);
      break;
    case flags.cpus:
      const cpusInfo = os.cpus();
      console.log(cpusInfo);
      break;
    case flags.homedir:
      const homedir = os.homedir();
      console.log(homedir);
      break;
    case flags.username:
      const username = os.userInfo().username;
      console.log(username);
      break;
    case flags.architecture:
      const architecture = os.arch();
      console.log(architecture);
      break;
    default:
      console.log('Invalid os flag');
      break;
  }
};

export default getOsInfo;
