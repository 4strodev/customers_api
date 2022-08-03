const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const customersRouter = require('./customers/router');

const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/customers', customersRouter);

module.exports = app;
