import { createReadStream, createWriteStream } from "fs";
import { createGzip, createGunzip } from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";

export const compress = async (source, destination) => {

    const sourseStream = createReadStream(source);
    const destStream = createWriteStream(destination);
    
    const pipe = promisify(pipeline);

    return pipe(sourseStream, createGzip(), destStream);
};

export const decompress = async (source, destination) => {
  const sourseStream = createReadStream(source);
  const destStream = createWriteStream(destination);
  
  const pipe = promisify(pipeline);

  return pipe(sourseStream, createGunzip(), destStream);
};