import { writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fileName = 'fresh.txt';
const filePath = path.join(__dirname, '.', 'files', fileName); 
const data = 'I am fresh and young';

const create = async () => {
  await access(filePath)
  .then(() => {
    const err = new Error('FS operation failed');
    console.log(err);
  })
  .catch(() => {
    writeFile(filePath, data, 'utf-8')
    .catch((err) => console.log("Creating file error: ", err));
  });    
};

await create();