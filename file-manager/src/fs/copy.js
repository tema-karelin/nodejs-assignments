import { createReadStream, createWriteStream  } from "node:fs";

export const copy = async (pathFrom, pathTo) => {
  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(pathTo, {encoding: 'utf-8', flags: 'wx'});
    const readStream = createReadStream(pathFrom);

    readStream.pipe(writeStream);

    writeStream.on('close', () => resolve());

    writeStream.on('error', (err) => reject(err));
    readStream.on('error', (err) => reject(err));
  })

};


