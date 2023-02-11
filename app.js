var path = require('path');
var express = require('express');
const env = require('./env');
const cors = require('cors');
var createError = require('http-errors');


var app = express();
var indexRouter = require('./routes/index');
var backendRouter = require('./routes/backend');

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/', indexRouter);
app.use('/api', backendRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

global.bills = []; //Global variable to store data 

//error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

const PORT = env.port;
app.listen(PORT, () => {
    console.log(`Medical bill upload service is running on port ${PORT}.`);
});

module.exports = app