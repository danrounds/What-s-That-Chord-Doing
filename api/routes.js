const express = require('express');
const jsonParser = require('body-parser').json();

const router = express.Router();
router.use(jsonParser);

const {UserScore} = require('./models');

router.get('/my-scores/:name', (req, res) => {
    // endpoint for getting all of a user's scores
    UserScore
        .findOne({name: req.params.name})
        .then(record => {
            if (record)
                res.json(record);
            else
                res.status(404).send();
        })
        .catch(() => res.status(500).send());
});


router.put('/my-scores*', (req, res) => {
    // Endpoint for updating individual user scores
    // Intent is to only submit one gameMode of updated scores, at once
    const gameMode = Object.keys(req.body.scores)[0];
    const requestScores = req.body.scores[gameMode];

    if (['easyMajor','easyMajorInvs','easyMinor','easyMinorInvs',
         'intermediateMinor','intermediateMinorInvs','hardMajor',
         'hardMajorInvs','hardMinor','hardMinorInvs','allChords',
         'allChordsInvs'].indexOf(gameMode) === -1
        || !req.body.name) {
        res.status(400).send();
    }

    for (let el of ['totalClicks','nAnsweredRight','nQuestionNumber'])
        if (!(el in requestScores)) {
            return res.status(400).send();
        }

    // Add win ratio:
    Object.assign(requestScores, {
        winRatio:requestScores.nAnsweredRight / requestScores.nQuestionNumber
    });

    UserScore.findOne({name: req.body.name})
        .then(record => {
            if (record) {
                const newFields = {
                    scores: Object.assign(record.scores, req.body.scores)
                };
                UserScore
                    .findOne({name: req.body.name})
                    .update({ $set: newFields })
                    .then(record => {
                        if (record.nModified)
                            res.status(200).send();
                        else
                            res.status(400).send();
                    });
            } else {
                const newScore = new UserScore;
                newScore.name = req.body.name;
                newScore.scores = req.body.scores;
                newScore.save()
                    .then(record => res.status(201).send())
                    .catch(err => {
                        if (err.errors.scores.name === 'ValidatorError')
                            res.status(400).send();
                        else
                            res.status(500).send();
                    });
            }
        })
        .catch(err => res.status(500).send());
});

router.get('/high-scores/:gameType', (req, res) => {
    const query = {}, match = { name: 1 }, sort = {};
    query['scores.'+req.params.gameType] = { $exists: true };
    match['scores.'+req.params.gameType] = 1;
    sort['scores.'+req.params.gameType+'.winRatio'] = -1;

    UserScore.find(query, match)
        .sort(sort)
        .then(results => res.json(results))
        .catch(() => res.status(500).send());
});

module.exports = {router};
