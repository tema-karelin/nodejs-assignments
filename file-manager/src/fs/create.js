import { writeFile } from 'node:fs/promises';

export const create = async (path) => {
  return new Promise((resolve, reject) => {
    writeFile(path, '', {encoding: 'utf-8', flag: 'wx'})
      .then(() => resolve())
      .catch((err) => {
        reject(err);
      });
  })
  
};