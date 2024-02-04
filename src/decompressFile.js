import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";

export const decompressFile = async (sourcePath, targetPath) => {
  const broti = createBrotliDecompress();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(targetPath);

  source.pipe(broti).pipe(destination);
};
