const express = require('express');
const app = express();

const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('Server is running'));