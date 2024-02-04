import { fileURLToPath } from "url";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";

export const compressFile = async (sourcePath, targetPath) => {
  const broti = createBrotliCompress();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(targetPath);

  source.pipe(broti).pipe(destination);
};
