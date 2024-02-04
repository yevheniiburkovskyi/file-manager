import fs from "fs";
import fsp from "fs/promises";

export const copyFile = async (
  sourcePath,
  targetPath,
  deleteSourceOnFinish
) => {
  const readStream = fs.createReadStream(sourcePath, { encoding: "utf-8" });

  await fsp.writeFile(targetPath, "");

  const writeStream = fs.createWriteStream(targetPath);

  readStream.pipe(writeStream);

  writeStream.on("finish", async () => {
    if (deleteSourceOnFinish) {
      await fsp.unlink(sourcePath);
    }
  });
};
