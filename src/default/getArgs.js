import { argv } from "node:process";
import { CLI_color } from "./colors.js";

const warning = CLI_color.yellow('WARNING:');
const warningMsg1 =
  `\n   Check if you run script with arguments in format "--propName=value"\n   In case of incorrect format the program output is unpredictable!\n`;
const warningMsg2 =
  '\n   Incorrect argument name!!!\n   Check arguments you\'ve typed in getArgs function!\n';

export const getArgs = (arg_name) => {
  // console.log(argv);
  let argsObj = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i].search(/^--/) !== 0) console.log(warning, CLI_color.red(argv[i]), warningMsg1); // Warning if parameter starts without "--"
    let keyValueArr = argv[i].replace("--", "").split("=");
    argsObj[keyValueArr[0]] = keyValueArr[1];
  }

  return argsObj[arg_name] || console.log(warning, CLI_color.red(arg_name), warningMsg2);
};
