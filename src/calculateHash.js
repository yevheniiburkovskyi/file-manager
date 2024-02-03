import fs from "fs";
import crypto from "crypto";

export const calculateHash = async (filePath) => {
  const hash = crypto.createHash("sha256");

  const readibleStream = fs.createReadStream(filePath, {
    encoding: "utf-8",
  });

  readibleStream.on("data", (chunk) => hash.update(chunk));

  readibleStream.on("end", () => console.log(hash.digest("hex")));
};
