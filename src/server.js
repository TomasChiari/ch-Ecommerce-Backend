import express, { application } from 'express';
import handlebars from 'express-handlebars';
import { router } from './router/routes.js';
import { dbConnect } from './db/mongo.config.js';
import { mongoUriSessions } from './config/server.config.js';

export const app = express();

dbConnect()

app.use(express.json());
app.use(express.static(process.cwd() + '/src/public/'))
app.use(cookieParser())

app.use(
    session({
      secret: 's3cr3t',
      store: MongoStore.create({ mongoUrl: mongoUriSessions }),
      resave: false,
      saveUninitialized: false,
    })
)

app.engine('handlebars', handlebars.engine())
app.set('views', process.cwd() + '/src/views/')
app.set('view engine', 'handlebars')


router(app);