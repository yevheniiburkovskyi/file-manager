import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const decompressFile = async (rootPathname, args) => {
  if (args.length !== 2) {
    console.log('Invalid file path');
    return;
  }
  try {
    const inputFilePath = path.join(rootPathname, args[0]);
    const outputFilePath = path.join(rootPathname, args[1]);

    const inputStream = fs.createReadStream(inputFilePath);
    const outputStream = fs.createWriteStream(outputFilePath);

    const brotiDecompressStream = zlib.createBrotliDecompress();

    inputStream.on('error', (error) => {
      console.log(error);
    });

    outputStream.on('error', (error) => {
      console.log(error);
    });

    brotiDecompressStream.on('error', (error) => {
      console.log(error);
    });

    inputStream.pipe(brotiDecompressStream).pipe(outputStream);
  } catch (error) {
    console.error(error);
  }
};

export default decompressFile;
