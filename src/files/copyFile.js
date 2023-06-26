import fs from 'fs/promises';
import path from 'path';

const copyFile = async (rootDirectory, args) => {
  if (args.length < 2) {
    console.log('Invalid file command');
    return;
  }
  try {
    const originalFilePath = path.join(rootDirectory, args[0]);
    const fileName = path.parse(originalFilePath).base;
    const copyFilePath = path.join(rootDirectory, args[1], fileName);
    await fs.copyFile(originalFilePath, copyFilePath);
  } catch (error) {
    console.error(error);
  }
};

export default copyFile;
