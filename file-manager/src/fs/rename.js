import path from "node:path"
import { fileURLToPath } from "url";
import { rename as renameFile, access} from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const oldPath = path.join(__dirname, '.', 'files', 'wrongFilename.txt');
const newPath = path.join(__dirname, '.', 'files', 'properFilename.md');

const errMsg = 'FS operation failed';

const rename = async () => {

  access(newPath)
  .then(() => {console.log(new Error(errMsg))})
  .catch(() => {
    renameFile(oldPath, newPath)
    .catch(() => {console.log(new Error(errMsg))});
  });
};

await rename();
