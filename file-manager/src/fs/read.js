import path from "node:path";
import { readFile } from "node:fs/promises";
import { createReadStream } from "fs";
import { stdout } from "process";

import { filename, dirname } from "../default/pathMod.js";


export const read = async (path) => {
  return new Promise((res, rej) => {
    const stream = createReadStream(path, "utf-8");
    stream.on('data', (data) => {
      stdout.write(data);
    });
    stream.on('end', () => {
      stream.destroy();
    })
    stream.on('close', () => {
      res();
    })
    stream.on('error', (err) => {
      rej(err);
    })
  })
};
