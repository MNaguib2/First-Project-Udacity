"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import path from "path";
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
//app.use('/assets', express.static(path.join(__dirname, 'assets/full')));
app.use(route_1.default);
app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
});
exports.default = app;
//http://localhost:3000/api/images?filename=test&width=100&height=100
