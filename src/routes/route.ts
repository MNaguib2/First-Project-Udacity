import getFullNameFile from "../imageprocessing";
import fs from "fs";
import path from "path";
import ProcessImage from '../SharpFunction';
import { Router } from "express";

const route = Router();

route.get('/api/images', (req, res, next) => {
    let filename = (req.query.filename as unknown) as string;
    let width: number = (req.query.width as unknown) as number;
    let height: number = (req.query.height as unknown) as number;
    if (filename) {
        getFullNameFile(filename)
        .then((result: string) => {
            if(!isNaN(width) && !isNaN(height)){
                ProcessImage(result, width, height).then(fullname => {
                    fs.readFile('./assets/thumbnail/'+ fullname, (err, data) => {
                        if (err) throw err;
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.end(data);
                    });
                }).catch(error => {
                    console.log(error);
                })
            }else{
                const error = new Error('Invalid height/width parameters');
                throw error
            }            
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

route.get('**',(req, res, next) => {
    res.send('Please Write Valid Url such as /api/images');
})

export default route;