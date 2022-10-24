import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './config/database.config';
import cors from 'cors';
import 'dotenv/config';


import userRouter from './routes/user';


 //db.sync({force:true})
db.sync({alter:true})
  .then(() => {
    console.log('Database conneted successfully');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static(path.join("public")));



app.use('/users', userRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

export default app;
