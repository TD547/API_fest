const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const festivalRouter = require('./routes/festival');
const artisteRouter = require('./routes/artiste');
const adminRouter = require('./routes/admin');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/festival', festivalRouter);
app.use('/artiste', artisteRouter);
app.use('/admin', adminRouter);

module.exports = app;
