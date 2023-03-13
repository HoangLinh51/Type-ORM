import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as http from 'http';
import jwt from 'jsonwebtoken';
import routes from './routes';
import { InitDBConnection } from './conectdb';

// establish database connection
InitDBConnection();

// create and setup express app
const app = express();
app.use(express.json());
dotenv.config();

// Call Middlewares
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set all routes
app.use('/', routes);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
