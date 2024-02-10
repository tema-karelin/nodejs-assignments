import path from "node:path";
import { fileURLToPath } from "url";
import { rm } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rmFilePath = path.join(__dirname, ".", "files", "fileToRemove.txt");
const errMsg = "FS operation failed";

const remove = async () => {
    rm(rmFilePath).catch(() => console.log(new Error(errMsg)))
};

await remove();
