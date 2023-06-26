import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

const moveFile = async (rootPath, args) => {
  if (args.length < 2) {
    console.log('Invalid file command');
    return;
  }
  try {
    const filePath = path.join(rootPath, args[0]);
    const fileName = path.parse(filePath).base;
    const moveFilePath = path.join(rootPath, args[1], fileName);

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(moveFilePath);

    readStream.on('error', (error) => {
      console.log(error);
      return;
    });
    writeStream.on('error', (error) => {
      console.log(error);
      return;
    });

    writeStream.on('finish', async () => {
      try {
        await fsPromises.unlink(filePath);
      } catch (error) {
        console.error(error);
      }
    });

    readStream.pipe(writeStream);
  } catch (error) {
    console.error(error);
  }
};

export default moveFile;
