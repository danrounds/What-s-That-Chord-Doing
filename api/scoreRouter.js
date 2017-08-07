const express = require('express');
const scoreRouter = express.Router();
const passport = require('passport');

const {UserScore} = require('./models');
const {basicStrategy} = require('./basicAuthentication');


// Our authenication
passport.use(basicStrategy);
scoreRouter.use(passport.initialize());

// ROUTES 
scoreRouter.get('/my-scores*', passport.authenticate('basic', {session: false}), (req, res) => {
    // endpoint for getting all of a user's scores. This is identical to
    // accountRouter's GET *, and changes should occur at both places at once.
    UserScore
        .findOne({name: req.user.name})
        .then(record => {
            if (record)
                res.json(record.apiRepr());
            else
                res.status(404).send();
        })
        .catch(() => res.status(500).send());
});

scoreRouter.put('/my-scores*', passport.authenticate('basic', {session: false}), (req, res) => {
    // Endpoint for updating individual user scores
    // Intent is to only submit one gameMode of updated scores, at once
    console.log('req.body.scores');
    console.log(req.body.scores);
    const gameMode = Object.keys(req.body.scores)[0];
    const requestScores = req.body.scores[gameMode];

    if (['easyMajor','easyMajorInvs','easyMinor','easyMinorInvs',
         'intermediateMinor','intermediateMinorInvs','hardMajor',
         'hardMajorInvs','hardMinor','hardMinorInvs','allChords',
         'allChordsInvs'].indexOf(gameMode) === -1) {
        return res.status(400).send();
    }

    for (let el of ['totalClicks','nAnsweredRight','nQuestionNumber'])
        if (!(el in requestScores)) {
            return res.status(400).send();
        }

    // Add win ratio:
    Object.assign(requestScores, {
        winRatio:requestScores.nAnsweredRight / requestScores.nQuestionNumber
    });

    UserScore.findOne({name: req.user.name})
        .then(record => {
            if (record) {
                const newFields = {
                    scores: Object.assign(record.scores || {}, req.body.scores)
                };
                UserScore
                    .findOne({name: req.user.name})
                    .update({ $set: newFields })
                    .then(record => {
                        if (record.nModified)
                            res.status(200).send();
                        else
                            res.status(304).send();
                    });
            } else {
                const newScore = new UserScore;
                newScore.name = req.user.name;
                newScore.scores = req.body.scores;
                newScore.save()
                    .then(() => res.status(201).send())
                    .catch(err => {
                        if (err.errors.scores.name === 'ValidatorError')
                            res.status(400).send();
                        else
                            res.status(500).send();
                    });
            }
        })
        .catch(() => res.status(500).send());
});

scoreRouter.get('/high-scores/:gameType', (req, res) => {
    const query = {}, match = { name: 1 }, sort = {};
    query['scores.'+req.params.gameType] = { $exists: true };
    match['scores.'+req.params.gameType] = 1;
    sort['scores.'+req.params.gameType+'.winRatio'] = -1;

    UserScore.find(query, match)
        .sort(sort)
        .then(results => res.json(
            results.map(result => result.apiRepr())))
        .catch(() => res.status(500).send());
});

module.exports = {scoreRouter};
