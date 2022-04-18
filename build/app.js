"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imageprocessing_1 = __importDefault(require("./imageprocessing"));
const fs_1 = __importDefault(require("fs"));
const SharpFunction_1 = __importDefault(require("./SharpFunction"));
const app = (0, express_1.default)();
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets/full')));
app.use('/api/images', (req, res, next) => {
    let filename = req.query.filename;
    let width = req.query.width;
    let height = req.query.height;
    if (!isNaN(width) && filename && !isNaN(height)) {
        (0, imageprocessing_1.default)(filename)
            .then(result => {
            (0, SharpFunction_1.default)(result, width, height).then(fullname => {
                fs_1.default.readFile(path_1.default.join(__dirname, 'assets', 'thumbnail', fullname), (err, data) => {
                    if (err)
                        throw err;
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(data);
                });
            }).catch(error => {
                console.log(error);
            });
        }).catch((error) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('<h1>Please Write Valid Url such as /api/images<h1>');
            res.write(`<h3>${error}<h3>`);
            res.end();
        });
    }
    else {
        res.send('Please Write Correct Data');
    }
});
app.use('**', (req, res, next) => {
    res.send('Please Write Valid Url such as /api/images');
});
app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
});
exports.default = app;
//http://localhost:3000/api/images?filename=test&width=100&height=100
