'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sharp_1 = __importDefault(require('sharp'));
const fs_1 = __importDefault(require('fs'));
function ProcessImage(fullname, width, height) {
  return __awaiter(this, void 0, void 0, function* () {
    const Newfullname = `filename=${
      fullname.split('.')[0]
    }&width=${width}&height=${height}.${fullname.split('.').pop()}`;
    try {
      const file = fs_1.default.readFileSync(
        process.cwd() + '/assets/thumbnail/' + Newfullname
      );
      if (file) {
        return Newfullname;
      }
    } catch (error) {
      yield (0, sharp_1.default)(`./assets/full/${fullname}`)
        .resize(+width, +height)
        .toFile('./assets/thumbnail/' + Newfullname) //*
        .then(() => {
          console.log('Image Convert Successful!!');
          return Newfullname;
        });
      //*/
    }
    return Newfullname;
  });
}
exports.default = ProcessImage;
