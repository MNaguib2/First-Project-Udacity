import getFullNameFile from '../imageprocessing';
import fs from 'fs';
import ProcessImage from '../SharpFunction';
import { Router, Request, Response } from 'express';

const route = Router();

route.get('/api/images', (req: Request, res: Response) => {
  const filename = req.query.filename as unknown as string;
  const width: number = req.query.width as unknown as number;
  const height: number = req.query.height as unknown as number;
  if (filename) {
    getFullNameFile(filename)
      .then((result: string) => {
        if (!isNaN(width) && !isNaN(height) && width > 0 && height > 0) {
          ProcessImage(result, width, height).then((fullname: string) => {
            fs.readFile(
              process.cwd() + '/assets/thumbnail/' + fullname,
              (err, data) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                return res.end(data);
              }
            );
          });
        } else {
          const error = new Error('Invalid height/width parameters');
          throw error;
        }
      })
      .catch((error: string) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('<h1>Please Write Valid Url such as /api/images<h1>');
        res.write(`<h3>${error}<h3>`);
        return res.end();
      });
  } else {
    return res.send('Please Write Correct Data');
  }
});

route.get('**', (req: Request, res: Response): Response => {
  return res.send('Please Write Valid Url such as /api/images');
});

export default route;
