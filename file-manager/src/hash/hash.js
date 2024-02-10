import { createHash } from "crypto";
import { createReadStream } from "fs";

import { CLI_color } from "../default/colors.js";

export const hash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const readStream = createReadStream(filePath, "utf-8");

    let result;
    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    readStream.on("end", () => {
      result = hash.digest("hex");
      readStream.destroy();
    });
    readStream.on("close", () => {
      console.log(
        CLI_color.cyan("    SHA256 hash: ") + CLI_color.green(result)
      );
      resolve();
    });
    readStream.on("error", (err) => reject(err));
  });
};
