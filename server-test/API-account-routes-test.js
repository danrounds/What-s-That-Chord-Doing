const chai = require('chai');
const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const areDeepEqual = require('assert').deepEqual;

mongoose.Promise = global.Promise;
const expect = chai.expect;
chai.use(require('chai-http'));

const { UserScore } = require('../api/models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
const { tearDownDb, seedDb } = require('./_setup');

// T E S T S :
describe('What\'s That Chord Doing API endpoints :: /accounts*', () => {

    let dataToSend;           // We'll be using this throughout our tests
    before(() => runServer( TEST_DATABASE_URL)
           .then(() => tearDownDb()));

    beforeEach(() => seedDb()
               .then(data => dataToSend = data));

    afterEach(() => tearDownDb());

    after(() => closeServer());

    describe('GET :: /accounts', () => {
        it('should return the right data and response code', () => chai.request(app)
           .get('/accounts')
           .set('Authorization', `Bearer ${dataToSend.token}`)
           .then(res => {
               const { body, status } = res;
               expect(status).to.equal(200);
               areDeepEqual(body.scores, dataToSend.scores);
           }));

        it('should fail on bad authorization', () => chai.request(app)
           .get('/accounts')
           .set('Authorization', `Bearer ${dataToSend.token+123}`) // bad token
           .catch((res) => expect(res.status).to.equal(401)));

        it('should return the same data that `GET:: /my-scores` endpoint returns', () => chai.request(app)
           .get('/accounts')
           .set('Authorization', `Bearer ${dataToSend.token}`)
           .then(resA => {
               return chai.request(app)
                   .get('/my-scores')
                   .set('Authorization', `Bearer ${dataToSend.token}`)
                   .then(resB => areDeepEqual(resA.body, resB.body));
           }));
    });

    describe('POST :: /accounts/log-in', () => {
        it('should return a JWT token for us, when we submit valid username/password', () => chai.request(app)
           .post('/accounts/log-in')
           .send({ name: dataToSend.name , password: dataToSend.password })
           .then(res => {
               const { body, status } = res;
               expect(status).to.equal(200);
               expect(body).to.equal(dataToSend.token);
           }));

        it('should return error status, when we submit a bad name/password combo', () => {
            chai.request(app)
                .post('/accounts/log-in')
                .send({ name: dataToSend.name, password: 'data' })
                .catch(res => expect(res.status).to.equal(401));
        });
    });

    describe('POST :: /accounts/register', () => {
        it('should return a JWT token when we register', () => chai.request(app)
           .post('/accounts/register')
           .send({ name: 'username', password: 'abc123' })
           .then(res => expect(res.body.split('.').length).to.equal(3)));
           // our JWT token should have three parts
    });

    describe('PUT :: /accounts/change-password', () => {
        it('should change our password', () => UserScore.findOne({ name: dataToSend.name })
           .then(oldRecord => chai.request(app)
                 .put('/accounts/change-password')
                 .set('Authorization', `Bearer ${dataToSend.token}`)
                 .send({
                     name: dataToSend.name,
                     newPassword: 'abc123',
                 })
                 .then((res) => expect(res.status).to.equal(204))
                 .then(() => UserScore.findOne({ name: dataToSend.name }))
                 .then(changed => expect(changed.password).not.to.equal(oldRecord.password))));
    });
    
    describe('DELETE :: /accounts/', () => {
        it('should delete our account', () => chai.request(app)
           .delete('/accounts/delete')
           .set('Authorization', `Bearer ${dataToSend.token}`)
           .then((res) => {
               expect(res.status).to.equal(200);
               return UserScore.findOne({ name: dataToSend.name });
           })
           .then(queryResult => expect(queryResult).to.be.null)
           // ^ We're expecting the record to be deleted
           .catch((err) => console.log(err)));
    });
});
