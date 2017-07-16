import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as Bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { TaskManager } from './modules/taskManager';
import { AuthRoutes, TaskRoutes } from './routes';

(<any>mongoose).Promise = Bluebird;
mongoose.connect('mongodb://localhost/todo-app').then(
    () => { },
    (err) => {
        console.error(err);
    });

global.Promise = Bluebird;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('TEST'));

app.use((req: express.Request, res: express.Response, next: () => void) => {
    res.removeHeader('X-Powered-By');
    next();
});

app.use('/auth/', AuthRoutes);
app.use('/api/', TaskRoutes);
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Application running on localhost:${port}`));

// ================== Graceful shutodwn ==================

if (process.platform === 'win32') {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', () => {
    console.log('\nSIGINT detected!');
    mongoose.disconnect()
        .then(() => {
            console.log('\nDatabase connection terminated... shutting down gracefully.');
            process.exit();
        });
});
