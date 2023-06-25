import os from 'os';

const getOsInfo = (args) => {
  const arg = args.join().replace('--', '');
  switch (arg) {
    case 'EOL':
      const formattedEOL = JSON.stringify(os.EOL);
      console.log(formattedEOL);
      break;
    case 'cpus':
      const cpusInfo = os.cpus();
      console.log(cpusInfo);
      break;
    case 'homedir':
      const homedir = os.homedir();
      console.log(homedir);
      break;
    case 'username':
      const username = os.userInfo().username;
      console.log(username);
      break;
    case 'architecture':
      const architecture = os.arch();
      console.log(architecture);
      break;
    default:
      console.log('invalid os command');
      break;
  }
};

export default getOsInfo;
