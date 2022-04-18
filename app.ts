import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

const app: Application = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');

app.set('views', 'view');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/images', (req: Request, res: Response, next: NextFunction) => {
    let filename = (req.query.filename as unknown) as string;
    let width: number = (req.query.width as unknown) as number;
    let height: number = (req.query.height as unknown) as number;
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
            console.log(error)
        });
})
app.use('**', (req, res , next) => {
    res.send('Please Write Valid Url such as /api/images')
})

function getFullNameFile(filename: string): Promise<string> {
    return new Promise((res, rej) => {
        fs.readdir('./assets', function (err, files) {
            if (err) {
                return rej('Unable to scan directory: ' + err)
            }
            files.forEach(function (file) {
                if (file.split('.')[0] === filename) {
                    return res(file);
                }
            });
            return rej('No File Found');
        });
    })
}

app.listen({ port: 3000 }, () => {
    console.log('server Running Ok !!');
})

export {app , getFullNameFile};

//http://localhost:3000/api/images?filename=test&width=100&height=100