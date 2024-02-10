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
import { checkDir, readDir } from "./fs/fs.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { rename } from "./fs/rename.js";
import { copy } from "./fs/copy.js";
import { remove } from "./fs/delete.js";
import { system } from "./os/os.js";
import { hash } from "./hash/hash.js";
import { compress, decompress } from "./compress/compress.js";

const user = getArgs("username");
// const welcomeMessage = CLI_color.green(
//   `\n  === Welcome to the File Manager, ${user}! ===\n`
// );
// const goodByeMessage = CLI_color.green(
//   `\n  === Thank you for using File Manager, ${user}, goodbye! ===\n`
// );
const homeDirectoryPath = path.normalize(env.HOME);
let currentDirectory = homeDirectoryPath;

// const currentPath = () => {
//   console.log("    You are currently in", CLI_color.blue(currentDirectory));
// };
// const invalidInput = () => {
//   console.log(CLI_color.bg_red('Invalid input!') + '\n' + CLI_color.red('Try again or use \"help\" to see the list of available commands'));
// };

const exitHandle = () => {
  goodByeMessage(user);
  process.exit(0);
};
const lineHandle = async (line) => {
  const operationArr = line.trim().split(" ");

  const filePath = path.normalize(path.join(currentDirectory, operationArr[1]));
  const destPath = path.normalize(path.join(currentDirectory, operationArr[2]));

  switch (operationArr[0]) {
    case ".exit":
      exitHandle();
      break;
    case "up":
      const pathArr = currentDirectory.split(path.sep);
      if (pathArr.length > 2) {
        currentDirectory = path.join(...pathArr.slice(0, -1));
      } else {
        currentDirectory = pathArr[0] + path.sep;
      }
      break;
    case "cd":
      //! absolute or relative path
      if (!operationArr[1]) {
        invalidInput();
        break;
      }
      await checkDir(filePath).then((isDir) => {
        if (isDir) {
          currentDirectory = filePath;
        } else {
          invalidInput();
        }
      });
      break;
    case "ls":
      //! absolute or relative path
      const lsPath = operationArr[1] ? filePath : currentDirectory;
      await readDir(lsPath);
      break;
    case "cat":
      if (!operationArr[1]) {
        invalidInput();
        break;
      }
      await read(filePath);
      break;
    case "add":
      await create(filePath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Creating file error: "), err.message);
      });
      break;
    case "rn":
      await rename(filePath, destPath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Renaming file error: "), err.message);
      });
      break;
    case "cp":
      await copy(filePath, destPath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Copeing file error: "), err.message);
      });
      break;
    case "mv":
      await copy(filePath, destPath)
        .then(() => {
          remove(mvInitialPath).catch((err) => {
            operationFailed();
            console.log(CLI_color.red("Removing file error: "), err.message);
          });
        })
        .catch((err) => {
          operationFailed();
          console.log(CLI_color.red("Copeing file error: "), err.message);
        });
      break;
    case "rm":
      await remove(filePath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Removing file error: "), err.message);
      });
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
