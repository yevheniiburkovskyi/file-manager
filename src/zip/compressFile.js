import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const compressFile = async (rootPathname, args) => {
  if (args.length !== 2) {
    console.log('Invalid file path');
    return;
  }

  const inputFilePath = path.join(rootPathname, args[0]);
  const outputFilePath = path.join(rootPathname, args[1]);
  try {
    const inputStream = fs.createReadStream(inputFilePath);
    const outputStream = fs.createWriteStream(outputFilePath);

    const brotiCompressStream = zlib.createBrotliCompress();

    inputStream.pipe(brotiCompressStream).pipe(outputStream);
  } catch {
    console.log('Invalid file path');
    return;
  }
};

export default compressFile;
