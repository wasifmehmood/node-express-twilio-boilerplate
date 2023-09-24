const http = require('http');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('./config/app_config');

const app = express();
app.use(cors());
app.use(bodyParser.json({}));

const routes = require('./routes');
require('./utils/database.js');
require('./models/index.js');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.use(routes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
