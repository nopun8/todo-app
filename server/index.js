require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { router } = require('./routes/todo.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Apply Cors Middleware
app.use(cors());

app.use('/', router);

const port = process.env.PORT;

app.listen(port);