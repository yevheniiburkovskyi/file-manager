import fs from 'fs/promises';
import path from 'path';

const renameFile = async (rootDirectory, args) => {
  if (args.length < 2) {
    console.log('Invalid file command');
    return;
  }
  try {
    const oldFilePath = path.join(rootDirectory, args[0]);
    const newFilePath = path.join(rootDirectory, args[1]);
    await fs.rename(oldFilePath, newFilePath);
  } catch (error) {
    console.error(error);
  }
};

export default renameFile;
