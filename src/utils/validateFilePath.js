import fsp from "fs/promises";

export const validateFilePath = async (filePath) => {
  const decompressFileStats = await fsp.stat(decompressSourcePath);

  if (decompressFileStats.isDirectory()) {
    throw Error;
  }
};
