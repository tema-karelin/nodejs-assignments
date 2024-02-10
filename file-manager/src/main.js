import process, { stdin, env, stdout } from "process";
import * as readline from "readline/promises";
import path from "path";

import { getArgs } from "./default/getArgs.js";
import { CLI_color } from "./default/colors.js";
import { welcomeMessage, goodByeMessage, invalidInput, currentPath } from "./default/messages.js";
import { checkDir, readDir } from "./fs/fs.js";

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
      const lsPath = operationArr[1] ? path.join(currentDirectory, operationArr[1]) : currentDirectory;
      await readDir(lsPath);
      break;
    case "cat":
      break;
    case "add":
      break;
    case "rn":
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
