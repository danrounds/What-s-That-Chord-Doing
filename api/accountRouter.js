const express = require('express');
const accountRouter = express.Router();
// const {BasicStrategy} = require('passport-http');
const passport = require('passport');

const {UserScore} = require('./models');
const {basicStrategy} = require('./basicAuthentication');


// Our authenication
passport.use(basicStrategy);
accountRouter.use(passport.initialize());

// ROUTES -- for user accounts: /accounts*
accountRouter.get('*', passport.authenticate('basic', {session: false}), (req, res) => {
    // endpoint for getting all of a user's scores. This is identical to
    // scoreRouter's GET *, and changes should occur at both places at once.
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

accountRouter.post('*', (req, res) => {
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
                .then(user => res.status(201).json())
                .catch(err => res.status(500).send());
        });
});

accountRouter.put('/:name', passport.authenticate('basic', {session: false}), (req, res) => {
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

accountRouter.delete('/:name', passport.authenticate('basic', {session: false}), (req, res) => {
    if (req.params.name !== req.user.name || req.user.name !== req.body.name)
        return res.status(400).json({error: 'Authenticated `name`, URL name, and request body don\'t match'});

    UserScore
        .remove({name: req.user.name})
        .exec()
        .then(thing => {
            if (thing.result.n)
                res.status(200).send();
            else
                res.status(404).send();
        })
        .catch(() => res.status(500).send());
});

module.exports = {accountRouter};
