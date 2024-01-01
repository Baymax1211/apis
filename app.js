const express = require('express');
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');

const eightball = require('./api/routes/8-ball');
const test = require('./api/routes/test-20');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));


app.use('/8-Ball', eightball);
app.use('/test', test);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;