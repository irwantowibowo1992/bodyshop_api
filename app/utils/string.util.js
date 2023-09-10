const fs = require('fs');
const path = require('path');
const listPath = [];
function traverseDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else {
      listPath.push(fullPath);
    }
  });
}

function getFullPath(dir) {
  traverseDir(dir);
  return listPath;
}

function generateRandomString(lengthCharacter) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < lengthCharacter; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function generateInvoiceNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const timestamp = date.getTime();
  return `INV-${year}${month}${day}-${timestamp}`;
}

module.exports = {
  getFullPath,
  generateRandomString,
  generateInvoiceNumber,
};
