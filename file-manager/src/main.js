import { getArgs } from "./getArgs.js";
import { CLI_color } from "./colors.js";
import process, {stdin, stdout} from "process";
import * as readline from "readline/promises";

const user = getArgs('username');
const welcomeMessage = CLI_color.green(`\n  === Welcome to the File Manager, ${user}! ===\n`);
const goodByeMessage = CLI_color.green(`\n  === Thank you for using File Manager, ${user}, goodbye! ===\n`);

const exitHandle = () => {
  console.log(goodByeMessage);
  process.exit(0);
};

const lineHandle = (line) => {
  switch (line) {
    case '.exit':
      exitHandle();
      break;
  
    default:
      break;
  }
}


console.log(welcomeMessage);
const rl = readline.createInterface(stdin);

rl.on('line', lineHandle);

process.on('SIGINT', exitHandle);