const express = require('express');

const swaggerui = require('swagger-ui-express');
const specs = require('./swaggerUI/swagger');


const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const db = require('./mongodb/db');
const { default: test } = require('node:test');

const PORT = process.env.PORT || 8403;
async function Init() {
await db.connect(); 
const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));


app.use('/transcripts', express.static(path.join(__dirname, '/transcripts')));


app.use(express.json());
// Used for cowntdown
app.enable('trust proxy, 1');

const discord_transcripts = require('./discord_trinscript');
app.get('/discord-transcript', discord_transcripts);

const temp_role = require('./temprole');
app.put('/temp-role', temp_role);

const replace = require('./replace');
app.post('/replace', replace);

const check = require('./check');
app.get('/check', check);

const remove = require('./remove');
app.post('/remove', remove)

const scramble = require('./scrample');
app.get('/scramble', scramble);

const calculater = require('./calculator');
app.post('/calculate', calculater);

const words = require('./words');
app.post('/words', words);

const serverpresence = require('./server_presence');
app.get('/server-presence/:serverId', serverpresence);

const movie = require('./movie');
app.get('/movie', movie);

const badword = require('./badword');
app.post('/badword', badword);

const tts = require('./tts');
app.post('/tts', tts);

const test = require('./test');
app.post('/test', test);


// mongo test
const make_key = require('./mongo apis/make key');
app.post('/make-key', make_key);

const update_keys_all = require('./mongo apis/reset all');
app.put('/update-keys', update_keys_all);

const update = require('./mongo apis/update');
app.put('/update-key', update);

// docs 
app.use('/docs', swaggerui.serve, swaggerui.setup(specs));
app.use(express.static('public'));



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

