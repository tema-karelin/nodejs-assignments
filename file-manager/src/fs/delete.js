import { rm } from "node:fs/promises";

export const remove = async (rmPath) => {
  return new Promise((resolve, reject) => {
    rm(rmPath)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};
