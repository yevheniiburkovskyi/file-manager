import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const compressFile = async (rootPathname, args) => {
  if (args.length !== 2) {
    console.log('Invalid file path');
    return;
  }
  try {
    const inputFilePath = path.join(rootPathname, args[0]);
    const { name } = path.parse(inputFilePath);
    const outputFilePath = path.join(rootPathname, args[1], `${name}.br`);
    const inputStream = fs.createReadStream(inputFilePath);
    const outputStream = fs.createWriteStream(outputFilePath);

    const brotiCompressStream = zlib.createBrotliCompress();

    inputStream.on('error', (error) => {
      console.log(error);
    });

    outputStream.on('error', (error) => {
      console.log(error);
    });

    brotiCompressStream.on('error', (error) => {
      console.log(error);
    });

    inputStream.pipe(brotiCompressStream).pipe(outputStream);
  } catch (error) {
    console.error(error);
  }
};

export default compressFile;
