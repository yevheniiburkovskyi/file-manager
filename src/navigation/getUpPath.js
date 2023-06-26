import path from 'path';

const getUpPath = (currentPath, systemPath) => {
  if (currentPath === systemPath) {
    return systemPath;
  }
  const newPath = path.resolve(currentPath, '..');
  return newPath;
};

export default getUpPath;
