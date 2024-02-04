import fsp from "fs/promises";

export const validateFilePath = async (filePath) => {
  const fileStats = await fsp.stat(filePath);

  if (fileStats.isDirectory()) {
    throw Error;
  }
};
