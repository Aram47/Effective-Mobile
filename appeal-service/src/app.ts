import express from 'express';
import cors from 'cors';
import configEnv from './config/env.js';
import connectDB from './config/db.js';
import AppealRouter from './routes/appeal-route.js';

export function start() {
  configEnv();
  connectDB();

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use('appeal', AppealRouter);
  return app;
}