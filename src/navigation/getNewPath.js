import path from 'path';
import fsPromises from 'fs/promises';

const getNewPath = async (args, currentPath) => {
  const newPath = path.join(currentPath, ...args);
  try {
    await fsPromises.access(newPath, fsPromises.constants.F_OK);
    return newPath;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getNewPath;
