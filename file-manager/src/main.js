import process, { stdin, env, stdout } from "process";
import * as readline from "readline/promises";
import path from "path";

import { getArgs } from "./default/getArgs.js";
import { CLI_color } from "./default/colors.js";
import { welcomeMessage, goodByeMessage, invalidInput, currentPath, operationFailed } from "./default/messages.js";
import { checkDir, readDir } from "./fs/fs.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { rename } from "./fs/rename.js";

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

  switch (operationArr[0]) {
    case ".exit":
      exitHandle();
      break;
    case "up":
      const pathArr = currentDirectory.split(path.sep);
      if (pathArr.length > 2) {
        currentDirectory = path.join(... pathArr.slice(0, - 1));
      } else {
        currentDirectory = pathArr[0] + path.sep;
      }
      break;
    case "cd":
      //! absolute or relative path
      if (!operationArr[1]) {
        invalidInput()
        break;
      }
      const newPath = path.join(currentDirectory, operationArr[1]);
      await checkDir(newPath)
        .then((isDir) => {
          if (isDir) {
            currentDirectory = newPath;
          } else {
            invalidInput();
          }
        })
      break;
    case "ls":
      //! absolute or relative path
      const lsPath = operationArr[1] ? path.join(currentDirectory, operationArr[1]) : currentDirectory;
      await readDir(lsPath);
      break;
    case "cat":
      if (!operationArr[1]) {
        invalidInput()
        break;
      }
      const catPath = path.normalize(path.join(currentDirectory, operationArr[1]));
      try {
        await read(catPath);
        console.log('end');
      } catch (error) {
        //! error message
      }
      break;
    case "add":
      const addPath = path.normalize(path.join(currentDirectory, operationArr[1]));
      await create(addPath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Creating file error: "), err.message);
      });
      break;
    case "rn":
      const filePath = path.normalize(path.join(currentDirectory, operationArr[1]));
      const newFilePath = path.normalize(path.join(currentDirectory, operationArr[2]));
      await rename(filePath, newFilePath).catch((err) => {
        operationFailed();
        console.log(CLI_color.red("Renaming file error: "), err.message);
      })
      break;
    case "cp":
      break;
    case "mv":
      break;
    case "rm":
      break;
    case "os":
      break;
    case "hash":
      break;
    case "compress":
      break;
    case 'decompress':
      break;
    case 'help':
      // console.log()
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
