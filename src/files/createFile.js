import fs from 'fs/promises';
import path from 'path';

const createFile = async (rootDirectory, args) => {
  if (args.length === 0) {
    console.log('Invalid file command');
    return;
  }
  try {
    const filePath = path.join(rootDirectory, args[0]);
    await fs.writeFile(filePath, '');
  } catch (error) {
    console.error(error);
  }
};

export default createFile;
