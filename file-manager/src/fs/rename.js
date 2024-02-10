import { rename as renameFile, access } from "node:fs/promises";

export const rename = async (filePath, newFilePath) => {
  return new Promise((resolve, reject) => {
    access(newFilePath)
      .then(() => {
        console.log(new Error(errMsg));
      })
      .catch(() => {
        renameFile(filePath, newFilePath)
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      });
  });
};
