import fs from "fs";

export const readFile = async (targetPath) => {
  const readibleStream = fs.createReadStream(targetPath, {
    encoding: "utf-8",
  });

  readibleStream.pipe(process.stdout);
};
