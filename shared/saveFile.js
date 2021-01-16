const { promises: fs } = require("fs");

const saveFile = async (data = null, savePath = null) => {
  if (data && savePath) {
    const stringified = JSON.stringify(data, null, 2);
    await fs.writeFile(savePath, stringified, "utf8");
    return `${savePath} saved`;
  }
  return null;
};

module.exports = saveFile;
