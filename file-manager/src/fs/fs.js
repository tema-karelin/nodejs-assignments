import * as fs from "fs/promises";
// import { invalidInput } from "./default/messages.js";
import { invalidInput } from "../default/messages.js";

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
    // const contentObj = {derectories: [], files: []};
    // let acc = 0;
    // for (const el of content) {
    //   if (acc < el.name.length) acc = el.name.length;
    //   if(el.isDirectory()) {
    //     contentObj.derectories.push(el.name);
    //   } else {
    //     contentObj.files.push(el.name);
    //   } 
    // };
    // console.log('acc: ', acc);

    // contentObj.derectories.sort((a,b) => (a - b));
    // contentObj.files.sort((a,b) => (a - b));

    // console.log('sorted contentObj:\n', contentObj);

    content.sort((a, b) => ((b.isDirectory() - a.isDirectory()) || (b.name<a.name - a.name<b.name)));

    const maxLength = content.reduce((acc, el) => (acc < el.name.length ? el.name.length : acc), 0);
    const nameStr = ' '.repeat(maxLength/2) + 'Name' + ' '.repeat(maxLength/2);

    const header = `|  index  |${nameStr}|     Type     |\n`;
    let body = '';
    for (let i = 0; i < content.length; i++) {
      const el = content[i];

      const index = `    ${i + 1}    `;
      const name = el.name;
      const type = el.isDirectory() ? 'directory' : 'file';
      
      const line = '|' + index + '|' + name + '|' + type + '|\n';
      body += line;
    }
    console.log(header + body);


    
    
} catch (err) {
    invalidInput();
}
}