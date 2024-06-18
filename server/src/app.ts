import express from 'express';
import dotenv from 'dotenv';
import { indexRouter } from './routes';

dotenv.config();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);

export default app;
