import fs from 'fs';
import path from 'path';

const readFile = (rootPath, args) => {
  if (args.length === 0) {
    console.log('Invalid file command');
    return;
  }
  try {
    const filePath = path.join(rootPath, args[0]);

    const readStream = fs.createReadStream(filePath);
    readStream.on('data', (chunk) => {
      console.log(chunk.toString());
      return;
    });

    readStream.on('error', (error) => {
      console.log(error);
      return;
    });
  } catch (error) {
    console.error(error);
  }
};

export default readFile;
