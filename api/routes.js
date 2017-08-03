const express = require('express');
const router = express.Router();
const {BasicStrategy} = require('passport-http');
const passport = require('passport');

const {UserScore} = require('./models');


//
const strategy = new BasicStrategy((username, password, cb) => {
    UserScore
        .findOne({name: username})
        .exec()
        .then(userScore => {
            if (!userScore)
                return cb(null, false, {message: 'Incorrect username'});
            return userScore.validatePassword(password)
                .then(isValid => {
                    if (!isValid) {
                        return cb(null, false, {message: 'Incorrect password'});
                    }
                    return cb(null, userScore); // success!
                });
        })
        .catch(err => cb(err));
});

passport.use(strategy);
router.use(passport.initialize());


// ROUTES 
router.get(['/my-scores*', '/user-accounts*'], passport.authenticate('basic', {session: false}), (req, res) => {
    // endpoint for getting all of a user's scores
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

router.post('/user-accounts*', (req, res) => {
    if (!(req.body.name && req.body.password))
        return res.status(400).json({error: 'Requests need `name` and `password`'});
    if (req.body.password.trim().length < 6)
        return res.status(400).json({error: 'Password must be at least six non-whitespace characters long'});

    UserScore.hashPassword(req.body.password.trim())
        .then(hashed => {
            UserScore
                .create({
                    name: req.body.name.trim(),
                    password: hashed,
                    scores: {},
                })
                .then(user => res.status(201).send())
                .catch(err => res.status(500).send());
        });
});

router.put('/user-accounts/:name', passport.authenticate('basic', {session: false}), (req, res) => {
    if (!(req.body.name && req.body.newPassword))
        return res.status(400).json({error: 'Requests need `name` and `newPassword`'});
    if (req.body.name !== req.params.name)
        return res.status(400).json({error: '`name` in body & URL don\'t match'});
    if (req.body.newPassword.trim().length < 6)
        return res.status(400).json({error: 'Password must be at least six non-whitespace characters long'});

    return UserScore.hashPassword(req.body.newPassword.trim())
        .then(hashed => {
            UserScore
                .update(
                    {name: req.user.name.trim()},
                    {$set: {'password': hashed}},
                    {runValidators: true}
                )
                .then(updated => res.status(204).send())
                .catch(err => res.status(500).json({message: 'Server error'}));
        });
});

router.delete('/user-accounts/:name', passport.authenticate('basic', {session: false}), (req, res) => {
    if (!(req.body.name && req.body.password )) {
        return res.status(400).json({error: 'Requests need `name` and `password`'});
    } else if (req.body.name !== req.params.name)
        return res.status(400).json({error: '`name` in body & URL don\'t match'});

    UserScore
        .remove({name: req.body.name})
        .exec()
        .then(thing => {
            if (thing.result.n)
                res.status(200).send();
            else
                res.status(404).send();
        })
        .catch(() => res.status(500).send());
});

router.put('/my-scores*', passport.authenticate('basic', {session: false}), (req, res) => {
    // Endpoint for updating individual user scores
    // Intent is to only submit one gameMode of updated scores, at once
    const gameMode = Object.keys(req.body.scores)[0];
    const requestScores = req.body.scores[gameMode];

    if (['easyMajor','easyMajorInvs','easyMinor','easyMinorInvs',
         'intermediateMinor','intermediateMinorInvs','hardMajor',
         'hardMajorInvs','hardMinor','hardMinorInvs','allChords',
         'allChordsInvs'].indexOf(gameMode) === -1
        || !req.body.name) {
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
        .then(results => res.json(
            results.map(result => result.apiRepr())))
        .catch(() => res.status(500).send());
});

module.exports = {router};
