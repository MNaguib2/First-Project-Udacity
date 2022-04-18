import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import getFullNameFile from "./imageprocessing";
import fs from "fs";
import ProcessImage from './SharpFunction';

const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets/full')));

app.use('/api/images', (req, res, next) => {
    let filename = (req.query.filename as unknown) as string;
    let width: number = (req.query.width as unknown) as number;
    let height: number = (req.query.height as unknown) as number;
    if (!isNaN(width) && filename && !isNaN(height)) {
        getFullNameFile(filename)
        .then(result => {
            ProcessImage(result, width, height).then(fullname => {
                fs.readFile(path.join(__dirname, 'assets', 'thumbnail', fullname), (err, data) => {
                    if (err) throw err;
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    res.end(data);
                });
            }).catch(error => {
                console.log(error);
            })            
        }).catch((error: string) => {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('<h1>Please Write Valid Url such as /api/images<h1>');
            res.write(`<h3>${error}<h3>`);
            res.end();
        })
    } else {
        res.send('Please Write Correct Data')
    }
})

app.use('**',(req, res, next) => {
        res.send('Please Write Valid Url such as /api/images');
})



app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
})

export default app;

//http://localhost:3000/api/images?filename=test&width=100&height=100