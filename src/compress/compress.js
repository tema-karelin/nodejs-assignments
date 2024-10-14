import { createReadStream, createWriteStream } from "fs";
import { createGzip, createGunzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import { inputErrorMessage, operErrorMessage } from "../default/messages.js";

export const compress = async (source, destination) => {
  if (!source || !destination) {
    inputErrorMessage('ERROR: Arguments required')
    return
  };
    const sourseStream = createReadStream(source);
    const destStream = createWriteStream(destination);
    
    const pipe = promisify(pipeline);

    await pipe(sourseStream, createGzip(), destStream).catch(err => {
      operErrorMessage(err.message);
    })
};

export const decompress = async (source, destination) => {
  if (!source || !destination) {
    inputErrorMessage('ERROR: Arguments required')
    return
  };
  const sourseStream = createReadStream(source);
  const destStream = createWriteStream(destination);
  
  const pipe = promisify(pipeline);

  await pipe(sourseStream, createGunzip(), destStream).catch(err => {
    operErrorMessage(err.message);
  });
};