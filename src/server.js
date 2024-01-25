import express, { application } from 'express';
import handlebars from 'express-handlebars';
import { router } from './router/routes.js';

export const app = express();

app.use(express.json());
app.use(express.static(process.cwd() + '/src/public/'))

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views/')
app.set('view engine', 'handlebars')


router(app);