const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const {router} = require('./routes');
const {DATABASE_URL, PORT} = require('./config');

// ES6-style promises for mongoose
mongoose.Promise = global.Promise;


///
// app-config & routes
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', router);

app.use('*', function(req, res) {
    res.status(404).json({message: 'Resource not found'});
});


/// Server setup -- We've set it up this way for testing purposes--i.e., the
//  server can be opened and closed by tests
let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`What's This Chord Doing score API is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if we call server.js, directly (`node server.js'). this block runs
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

// We export runServer and closeServer so that other code can start/close the
// server, at will.
// to start & close, over and over.
module.exports = {runServer, closeServer, app};
