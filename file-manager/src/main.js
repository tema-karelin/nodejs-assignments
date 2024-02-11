import process, { stdin, env, stdout } from "process";
import * as readline from "readline/promises";
import path from "path";

import { getArgs } from "./default/getArgs.js";
import { CLI_color } from "./default/colors.js";
import {
  welcomeMessage,
  goodByeMessage,
  invalidInput,
  currentPath,
  operationFailed,
} from "./default/messages.js";
import { cd, checkDir, readDir, up, read, create, rename, copy, remove, move } from "./fs/fs.js";
// import { copy } from "./fs/copy.js";
// import { remove } from "./fs/delete.js";
import { system } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress, decompress } from "./compress/compress.js";

const user = getArgs("username");

const homeDirectoryPath = path.normalize(env.HOME);
let currentDirectory = homeDirectoryPath;

const exitHandle = () => {
  goodByeMessage(user);
  process.exit(0);
};
const lineHandle = async (line) => {
  const operationArr = line.trim().split(" ");
  // check if arguments typed & check for absolute path
  let filePath;
  let destPath;
  if (operationArr[1]) {
    if (path.isAbsolute(operationArr[1])) {
      filePath = path.normalize(operationArr[1]);
    } else {
      filePath = path.normalize(path.join(currentDirectory, operationArr[1]));
    }
  }
  if (operationArr[2]) {
    if (path.isAbsolute(operationArr[2])) {
      destPath = path.normalize(operationArr[2]);
    } else {
      destPath = path.normalize(path.join(currentDirectory, operationArr[2]));
    }
  }

  switch (operationArr[0]) {
    case ".exit":
      exitHandle();
      break;

    case "up":
      currentDirectory = up(currentDirectory);
      break;

    case "cd":
      currentDirectory = await cd(filePath, currentDirectory);
      break;

    case "ls":
      const lsPath = operationArr[1] ? filePath : currentDirectory;
      await readDir(lsPath);
      break;

    case "cat":
      await read(filePath);
      break;

    case "add":
      await create(filePath);
      break;

    case "rn":
      await rename(filePath, destPath);
      break;

    case "cp":
      await copy(filePath, destPath);
      // .catch((err) => {
      //   operationFailed();
      //   console.log(CLI_color.red("Copeing file error: "), err.message);
      // });
      break;

    case "mv":
      await move(filePath, destPath);
      break;

    case "rm":
      await remove(filePath);
      // .catch((err) => {
      //   operationFailed();
      //   console.log(CLI_color.red("Removing file error: "), err.message);
      // });
      break;

    case "os":
      system(operationArr[1]);
      break;

    case "hash":
      await hash(filePath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("    Hashing file error: "), err.message);
      });
      break;

    case "compress":
      //! error handling
      await compress(filePath, destPath);
      break;

    case "decompress":
      //! error handling
      await decompress(filePath, destPath);
      break;

    case "help":
      break;

    default:
      invalidInput();
      break;
  }
  currentPath(currentDirectory);
};

welcomeMessage(user);
currentPath(currentDirectory);
const rl = readline.createInterface(stdin);

rl.on("line", lineHandle);

process.on("SIGINT", exitHandle);
