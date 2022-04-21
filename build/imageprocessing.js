'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_1 = __importDefault(require('fs'));
function getFullNameFile(filename) {
  return new Promise((res, rej) => {
    fs_1.default.readdir('./assets/full', (err, files) => {
      if (err) {
        rej('Unable to scan directory: ');
      }
      files.forEach((file) => {
        if (file.split('.')[0] === filename) {
          return res(file);
        }
      });
      rej('Invalid original file names');
    });
  });
}
exports.default = getFullNameFile;
