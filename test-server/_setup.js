const chai = require('chai');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');

const { UserScore } = require('../api/models');
const { generateAccount, generateReplacementScore, generateHighScores }
          = require('../api/_fake');
const { JWT_SECRET } = require('../config');

mongoose.Promise = global.Promise;
chai.use(require('chai-http'));

function tearDownDb() {
    console.warn('Clearing db records');
    return mongoose.connection.dropDatabase();
}

function seedDb() {
    // This adds a single account and a full helping of scores to go with it
    let { name, password, scores } = generateAccount();
    return UserScore
        .hashPassword(password)
        .then(hashed => UserScore
              .create({ password: hashed, name, scores })
              .then(user => jwt.encode({ id: user._id }, JWT_SECRET ))
              .then(token => ({ token, name, password, scores })))
        .catch(err =>  console.warn(err));
}

module.exports = { tearDownDb, seedDb, };
