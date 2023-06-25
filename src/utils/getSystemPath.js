import path from 'path';

const getSystemPath = () => {
  const systemDrive = process.env.systemDrive;
  const systemUsername = process.env.username;
  const systemPath = path.join(systemDrive, 'Users', systemUsername);
  return systemPath;
};

export default getSystemPath;
