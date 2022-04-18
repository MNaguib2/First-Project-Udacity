"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullNameFile = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
exports.app = app;
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.set('view engine', 'ejs');
app.set('views', 'view');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api/images', (req, res, next) => {
    let filename = req.query.filename;
    let width = req.query.width;
    let height = req.query.height;
    if (isNaN(width)) {
        width = 100;
    }
    if (isNaN(height)) {
        height = 100;
    }
    getFullNameFile(filename)
        .then(FullName => {
        res.render('viewImage', {
            height: height,
            width: width,
            filename: FullName
        });
    })
        .catch(error => {
        res.render('viewImage', {
            height: height,
            width: width,
            filename: error
        });
        console.log(error);
    });
});
app.use('**', (req, res, next) => {
    res.send('Please Write Valid Url such as /api/images');
});
function getFullNameFile(filename) {
    return new Promise((res, rej) => {
        fs_1.default.readdir('./assets', function (err, files) {
            if (err) {
                return rej('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                if (file.split('.')[0] === filename) {
                    return res(file);
                }
            });
            return rej('No File Found');
        });
    });
}
exports.getFullNameFile = getFullNameFile;
app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
});
//http://localhost:3000/api/images?filename=test&width=100&height=100
