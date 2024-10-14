import * as fs from "fs/promises";
import { inputErrorMessage, operErrorMessage } from "../default/messages.js";
import console from "console";
import * as path from "path";
import { createReadStream, createWriteStream } from "fs";
import { stdout } from "process";
import { CLI_color } from "../default/colors.js";

export const checkDir = async (path) => {
  return new Promise((resolve, reject) => {
    const statCheck = fs.stat(path);
    statCheck
      .then((stats) => {
        const isDir = stats.isDirectory();
        resolve(isDir);
      })
      .catch((err) => reject(err));
  });
};

export const readDir = async (path) => {
  try {
    const content = await fs.readdir(path, {
      encoding: "utf-8",
      withFileTypes: true,
    });
    content.sort(
      (a, b) =>
        b.isDirectory() - a.isDirectory() || b.name < a.name - a.name < b.name
    );
    const arrToConsole = content.map((el) => {
      return {
        Name: el.name,
        Type: el.isDirectory() ? "directory" : "file",
      };
    });
    console.table(arrToConsole);
  } catch (err) {
    operErrorMessage(err.message);
  }
};

export const up = (currentDirectory) => {
  let current = currentDirectory;
  const pathArr = current.split(path.sep);
  if (pathArr.length > 2) {
    current = path.join(...pathArr.slice(0, -1));
  } else {
    current = pathArr[0] + path.sep;
  }
  return current;
};

export const cd = async (dirPath, current) => {
  if (!dirPath) {
    inputErrorMessage("ERROR: Argument required");
    return current;
  }
  return checkDir(dirPath)
    .then((isDir) => {
      if (isDir) {
        return dirPath;
      } else {
        inputErrorMessage("Path you typed is not directory");
        return current;
      }
    })
    .catch((err) => {
      operErrorMessage(err.message);
      return current;
    });
};

export const read = async (path) => {
  if (!path) {
    inputErrorMessage("ERROR: Argument required");
    return;
  }
  const read = new Promise((res, rej) => {
    const stream = createReadStream(path, "utf-8");
    stream.on("data", (data) => {
      stdout.write(CLI_color.cyan(data));
    });
    stream.on("open", () => stdout.write("\n"));
    stream.on("end", () => {
      stdout.write("\n\n");
      stream.destroy();
    });
    stream.on("close", () => {
      res();
    });
    stream.on("error", (err) => {
      rej(err);
    });
  });
  await read.catch((err) => operErrorMessage(err.message));
};

export const create = async (path) => {
  if (!path) {
    inputErrorMessage("ERROR: Argument required");
    return;
  }
  const addFile = new Promise((resolve, reject) => {
    fs.writeFile(path, "", { encoding: "utf-8", flag: "wx" })
      .then(() => resolve())
      .catch((err) => {
        reject(err);
      });
  });
  await addFile.catch((err) => {
    operErrorMessage(err.message);
  });
};

export const rename = async (filePath, newFilePath) => {
  if (!filePath || !newFilePath) {
    inputErrorMessage("ERROR: Arguments required");
    return;
  }
  const rn = new Promise((resolve, reject) => {
    fs.access(newFilePath)
      .then(() => {
        reject(new Error("ERROR: destination file alredy exists"));
      })
      .catch(() => {
        fs.rename(filePath, newFilePath)
          .then(() => resolve())
          .catch((err) => {
            reject(err);
          });
      });
  });
  await rn.catch((err) => {
    operErrorMessage(err.message);
  });
};

export const copy = async (pathFrom, pathTo) => {
  if (!pathFrom || !pathTo) {
    inputErrorMessage("ERROR: Arguments required");
    return;
  }
  let destPath;
  await checkDir(pathTo)
    .then((isDir) => {
      if (isDir) {
        destPath = path.join(pathTo, path.basename(pathFrom));
      } else {
        destPath = pathTo;
      }
    })
    .catch((err) => {
      if (err.code === 'ENOENT') {
        destPath = pathTo;
      } else {
        operErrorMessage(err.message);
      }
    });
  const cp = new Promise((resolve, reject) => {
    const writeStream = createWriteStream(destPath, {
      encoding: "utf-8",
      flags: "wx",
    });
    const readStream = createReadStream(pathFrom);

    readStream.pipe(writeStream);

    writeStream.on("close", () => resolve());

    writeStream.on("error", (err) => reject(err));
    readStream.on("error", (err) => reject(err));
  });
  await cp.catch((err) => {
    operErrorMessage('cp: ' + err.message);
  });
};

export const remove = async (rmPath) => {
  if (!rmPath) {
    inputErrorMessage("ERROR: Argument required");
    return;
  }
  const rm = new Promise((resolve, reject) => {
    fs.rm(rmPath)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
  await rm.catch((err) => {
    operErrorMessage(err.message);
  });
};

export const move = async (filePath, destPath) => {
  if (!filePath || !destPath) {
    inputErrorMessage("ERROR: Arguments required");
    return;
  }
  await copy(filePath, destPath);
  await remove(filePath);
};
