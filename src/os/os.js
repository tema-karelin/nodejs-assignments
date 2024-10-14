import os from "os";
import { stdout } from "process";

import { invalidInput } from "../default/messages.js";
import { CLI_color } from "../default/colors.js";

export const system = (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(CLI_color.cyan('    EOL: ') + CLI_color.green(JSON.stringify(os.EOL)));
      break;
    case "--cpus":
      const cpus = os.cpus();
      const cpusTableObj = cpus.map(el => {
        const { model } = el;
        const [name, frequency] = model.split(/\sCPU[\s\w]+@\s/);
        return {
          Model: name,
          frequency,
        }
      })
      console.log(CLI_color.cyan('    Number of CPUs: ') + CLI_color.green(cpusTableObj.length));
      console.table(cpusTableObj);
      break;
    case "--homedir":
      console.log(CLI_color.cyan('    Home directory: ') + CLI_color.green('  ' + os.homedir()));
      break;
    case "--username":
      console.log(CLI_color.cyan('    Username: ') + CLI_color.green(os.userInfo().username));
      break;
    case "--architecture":
      console.log(CLI_color.cyan('    Architecture: ') + CLI_color.green(os.arch()));
      break;

    default:
    invalidInput();
      break;
  }
};
