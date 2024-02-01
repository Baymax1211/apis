const express = require('express');



const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = 8403;
async function Init() {
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));


const testing = require('./api/routes/test1');
app.get('/', testing);




app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
// Listen on port
app.listen(PORT, () => {
    console.log(`Server Is running on port ${PORT}`);
});
return { app };
};


module.exports = Init().catch(console.error);

