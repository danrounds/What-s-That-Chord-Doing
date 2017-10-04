const chai = require('chai');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const areDeepEqual = require('assert').deepEqual;

mongoose.Promise = global.Promise;
const expect = chai.expect;
chai.use(require('chai-http'));

const { UserScore } = require('../api/models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL, TEST_PORT, JWT_SECRET } = require('../config');
const { tearDownDb, seedDb } = require('./_setup');
const { generateReplacementScore, generateHighScores }
          = require('../api/_fake');

// T E S T S :
describe('What\'s That Chord Doing API score endpoints', () => {

    let dataToSend;           // We'll be using this throughout our tests
    before(() => {
        runServer(TEST_DATABASE_URL, TEST_PORT);
        return tearDownDb();
    });

    beforeEach(() => seedDb()
               .then(data => dataToSend = data));

    afterEach(() => tearDownDb());

    after(() => closeServer());

    describe('GET :: /my-scores', () => {
        // This one returns the same data as the GET /accounts/ endpoint, and
        // should be updated, accordingly
        it('should return the right data and response code', () => chai.request(app)
           .get('/my-scores')
           .set('Content-Type', 'application/json')
           .set('Authorization', `Bearer ${dataToSend.token}`)
           .then(res => {
               const { body, status } = res;
               expect(status).to.equal(200);
               areDeepEqual(body.scores, dataToSend.scores);
           }));
    });

    describe('PUT :: /my-scores', () => {
        it('should update scores', () => {
            const replacementScore = generateReplacementScore();
            const scoreType = Object.keys(replacementScore.scores)[0];
            const dataSubmitted = replacementScore.scores[scoreType];

            return chai.request(app)
                .put('/my-scores/')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${dataToSend.token}`)
                .send(replacementScore)
                .then((res) => UserScore
                      .findOne({ name: dataToSend.name })
                      .then(dbScoresList => {
                          expect(res.status).to.equal(200);
                          areDeepEqual(dbScoresList.scores[scoreType], dataSubmitted);
                      }));
        });
    });
    
    describe('GET :: /high-scores/:scoreType', () => {
        // `beforeAll` hook is useless, here, but not worth restructuring code.
        it('should retrieve a list of high scores', () => {
            const highScores = generateHighScores();
            const scoreType = Object.keys(highScores[0].scores)[0];

            return UserScore.insertMany(highScores)
                .then(() => chai.request(app)
                      .get(`/high-scores/${scoreType}`)
                      .then(result => {
                          let scores = result.body;
                          let topScore = scores[0].scores[scoreType];

                          let priorWinRatio;
                          scores.forEach((score) => {
                              let currentWinRatio = score.scores[scoreType].winRatio;
                              if (priorWinRatio)
                                  // Test whether we have records in order
                                  expect(priorWinRatio).to.be.gte(currentWinRatio);

                              priorWinRatio = score.scores[scoreType].winRatio;
                          });


                          expect(topScore).to.have.all.keys([
                              'totalClicks','nAnsweredRight','nQuestionNumber',
                              'winRatio'
                          ]);

                      }));

        });
    });
});
