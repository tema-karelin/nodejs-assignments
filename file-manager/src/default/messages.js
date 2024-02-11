import { CLI_color } from "./colors.js";

export const welcomeMessage = (user) => {
  console.log(
    CLI_color.green(`\n  === Welcome to the File Manager, ${user}! ===\n`)
  );
};

export const goodByeMessage = (user) => {
  console.log(
    CLI_color.green(
      `\n\n  === Thank you for using File Manager, ${user}, goodbye! ===\n`
    )
  );
};

export const currentPath = (currentDirectory) => {
  console.log("\n       You are currently in", CLI_color.blue(currentDirectory));
};

export const invalidInput = () => {
  console.log("\n    " + CLI_color.bg_red("Invalid input!") + "\n" + CLI_color.red('    Try again or use "help" to see the list of available commands'));
};

export const operationFailed = () => {
  console.log("\n    " + CLI_color.bg_red("Operation failed!"));
};

export const helpMessage = () => {
  

}

export const inputErrorMessage = (msg) => {
  invalidInput();
  if (msg) console.log(CLI_color.yellow('    ' + msg));
}

export const operErrorMessage = (msg) => {
  operationFailed();
  if (msg) console.log(CLI_color.yellow('    ' + msg));
}