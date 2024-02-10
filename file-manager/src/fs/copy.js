import { cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder2Copy = path.join(__dirname, ".", "files");
const copyDest = path.join(__dirname, ".", "files_copy");

const copy = async () => {
  cp(folder2Copy, copyDest, {
    recursive: true,
    force: false,
    errorOnExist: true,
  }).catch(() => console.log(new Error("FS operation failed")));
};

await copy();
