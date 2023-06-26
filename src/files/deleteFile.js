import fsPromises from 'fs/promises';
import path from 'path';

const deleteFile = async (rootPath, args) => {
  if (args.length === 0) {
    console.log('Invalid file command');
    return;
  }

  try {
    const filePath = path.join(rootPath, args[0]);
    await fsPromises.unlink(filePath);
  } catch (error) {
    console.error(error);
  }
};

export default deleteFile;
