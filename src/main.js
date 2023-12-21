import express, { application } from 'express';
import handlebars from 'express-handlebars';
import { router } from './router/index.js';

export const app = express();

app.use(express.json());
app.use(express.static('public'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views/')


router(app);