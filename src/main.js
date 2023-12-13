import express from 'express';
import { router } from './router/index.js';

export const app = express();

app.use(express.json());

router(app);