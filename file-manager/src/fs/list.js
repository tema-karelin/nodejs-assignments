import path from "node:path";
import { fileURLToPath } from "url";
import { readdir } from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const folder = 'files';
const dirPath = path.join(__dirname, ".", folder);
const errMsg = "FS operation failed";

const list = async () => {
    readdir(dirPath)
    .then(res => {
        res.forEach((file) => console.log(' - ', file));
    })
    .catch(() => (console.log(new Error(errMsg))));
};

await list();