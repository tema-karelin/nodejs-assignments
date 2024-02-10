import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CLI_color } from "../default/colors.js";

export const create = async (path) => {
  return new Promise((resolve, reject) => {
    writeFile(path, '', {encoding: 'utf-8', flag: 'wx'})
      .then(() => resolve())
      .catch((err) => {
        reject(err);
      });
  })
  
};