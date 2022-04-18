"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageprocessing_1 = __importDefault(require("../imageprocessing"));
const fs_1 = __importDefault(require("fs"));
const SharpFunction_1 = __importDefault(require("../SharpFunction"));
const express_1 = require("express");
const route = (0, express_1.Router)();
route.get('/api/images', (req, res, next) => {
    let filename = req.query.filename;
    let width = req.query.width;
    let height = req.query.height;
    if (filename) {
        (0, imageprocessing_1.default)(filename)
            .then((result) => {
            if (!isNaN(width) && !isNaN(height)) {
                (0, SharpFunction_1.default)(result, width, height).then(fullname => {
                    fs_1.default.readFile('./assets/thumbnail/' + fullname, (err, data) => {
                        if (err)
                            throw err;
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.end(data);
                    });
                }).catch(error => {
                    console.log(error);
                });
            }
            else {
                const error = new Error('Invalid height/width parameters');
                throw error;
            }
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
route.get('**', (req, res, next) => {
    res.send('Please Write Valid Url such as /api/images');
});
exports.default = route;
