import * as fs from "fs/promises";
// import { invalidInput } from "./default/messages.js";
import { invalidInput } from "../default/messages.js";
import console from "console";

export const checkDir = async (path)  => {
  try {
    const statCheck = await fs.stat(path);
    return statCheck.isDirectory();
  } catch (err) {
    return false;
  }
}

export const readDir = async (path)  => {
  try {
    const content = await fs.readdir(path, {encoding:'utf-8', withFileTypes: true});
    content.sort((a, b) => ((b.isDirectory() - a.isDirectory()) || (b.name<a.name - a.name<b.name)));
    const arrToConsole = content.map((el) => {
      return {
        'Name': el.name,
        'Type': el.isDirectory() ? 'directory' : 'file'
      }
    });
    console.table(arrToConsole);
} catch (err) {
    invalidInput();
}
}