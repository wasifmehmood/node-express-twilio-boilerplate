import http from 'http';

import app_config from './config/app_config.mjs';
const port = app_config.port;

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

import routes from './routes/index.mjs';
import('./utils/database.js');
import('./models/index.js');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.use(routes);

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});