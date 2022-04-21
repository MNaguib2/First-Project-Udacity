import express, { Application } from 'express';
//import path from "path";
import route from './routes/route';

const app: Application = express();

//app.use('/assets', express.static(path.join(__dirname, 'assets/full')));

app.use(route);

app.listen({ port: 3000 }, () => {
  console.log('server Running Ok !!');
});

export default app;

//http://localhost:3000/api/images?filename=test&width=100&height=100
