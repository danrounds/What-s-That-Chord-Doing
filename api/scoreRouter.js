const express = require('express');
const scoreRouter = express.Router();

const {UserScore} = require('./models');
const auth = require('./jwtAuthentication');

// Our authenication
scoreRouter.use(auth.initialize());

// ROUTES
scoreRouter.get('/my-scores*', auth.authenticate(), (req, res) => {
    // endpoint for getting all of a user's scores. This is identical to
    // accountRouter's GET *, and changes should occur at both places at once.
    UserScore
        .findById(req.user.id)
        .then(record => {
            if (record)
                res.json(record.apiRepr());
            else
                res.sendStatus(404);
        })
        .catch(() => res.sendStatus(500));
});

scoreRouter.put('/my-scores*', auth.authenticate(), (req, res) => {
    // Endpoint for updating individual user scores
    // Intent is to only submit one gameMode of updated scores, at once
    const gameMode = Object.keys(req.body.scores)[0];
    const requestScores = req.body.scores[gameMode];

    if (['easyMajor','easyMajorInv','easyMinor','easyMinorInv',
         'intermediateMinor','intermediateMinorInv','hardMajor',
         'hardMajorInv','hardMinor','hardMinorInv','allChords',
         'allChordsInv'].indexOf(gameMode) === -1) {
        return res.sendStatus(400);
    }

    for (let el of ['totalClicks','nAnsweredRight','nQuestionNumber'])
        if (!(el in requestScores)) {
            return res.sendStatus(400);
        }

    // Add win ratio:
    Object.assign(requestScores, {
        winRatio: requestScores.nAnsweredRight / requestScores.nQuestionNumber
    });

    UserScore.findById(req.user.id)
        .then(record => {
            if (record) {
                const newFields = {
                    scores: Object.assign(record.scores || {}, req.body.scores)
                };
                UserScore
                    .findById(req.user.id)
                    .update({ $set: newFields })
                    .then(record => {
                        if (record.nModified)
                            res.sendStatus(200);
                        else
                            res.sendStatus(304);
                    });
            } else {
                const newScore = new UserScore;
                newScore.name = req.user.name;
                newScore.scores = req.body.scores;
                newScore.save()
                    .then(() => res.sendStatus(201))
                    .catch(err => {
                        if (err.errors.scores.name === 'ValidatorError')
                            res.sendStatus(400);
                        else
                            res.sendStatus(500);
                    });
            }
        })
        .catch(() => res.sendStatus(500));
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
        .catch(() => res.sendStatus(500).send());
});

module.exports = {scoreRouter};
