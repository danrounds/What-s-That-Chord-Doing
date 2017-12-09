const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { DATABASE_URL, PORT } = require('./config');
const { accountRouter } = require('./api/accountRouter');
const { scoresRouter } = require('./api/scoresRouter');

// ES6-style promises for mongoose
mongoose.Promise = global.Promise;


///
// App-config & routes
const app = express();
app.use(morgan('dev'), bodyParser.json(), cors());

const options = {
    // Options for serving our static files
    dotfiles: 'ignore',
    etag: true,
    extensions: ['htm', 'html'],
    index: 'index.html',
    lastModified: true,
    maxAge: '1d',
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
        res.header('Cache-Control', 'public, max-age=1d');
    }
};

app.use('/app', express.static('build/', options));       // React app
app.use('/accounts/', accountRouter);                     // API route
app.use('/', scoresRouter);      // /my-scores* and /high-scores API routes
app.use('/', express.static('./build/assets/', options)); // Static files -- splash page
app.use('*', (req, res) =>                                // Everything else
    res.status(404).json({message: 'Resource not found'}));


/// Server setup -- We've set it up this way for testing purposes--i.e., the
//  server can be opened and closed by tests
let server;
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    console.log(port);
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

// If we call server.js, directly (`node server.js'). this block runs
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

// We export runServer and closeServer so that other code can start/close the
// server, at will.
// to start & close, over and over.
module.exports = { runServer, closeServer, app };
