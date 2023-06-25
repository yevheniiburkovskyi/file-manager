import fsPromises from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

const getHash = async (rootPath, args) => {
  if (!args.length) {
    console.log('Invalid file path');
    return;
  }

  const arg = args[0];
  const filePath = path.join(rootPath, arg);
  try {
    const fileBuffer = await fsPromises.readFile(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    const resHashInHex = hash.digest('hex');
    console.log(resHashInHex);
  } catch {
    console.log('Invalid file path');
  }
};

export default getHash;
