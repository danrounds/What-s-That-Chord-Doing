const express = require('express');
const accountRouter = express.Router();
const jwt = require('jwt-simple');

const {UserScore} = require('./models');
const auth = require('./jwtAuthentication');
const cfg = require('../config');

// Our authenication
accountRouter.use(auth.initialize());

// ROUTES -- for user accounts: /accounts*
accountRouter.get('*', auth.authenticate(), (req, res) => {
    // endpoint for getting all of a user's scores. This is identical to
    // scoresRouter's GET *, and changes should occur at both places at once.
    
    return UserScore
        .findById(req.user.id)
        .then(record => {
            if (record)
                res.json(record.apiRepr());
            else
                res.sendStatus(404).send();
        })
        .catch(() => res.sendStatus(500));
});

accountRouter.post('/log-in', (req, res) => {
    // Log in endpoint -- returns the relevant JWT token

    if (req.body.name && req.body.password) {
        return UserScore.findOne({name: req.body.name})
            .then(userScore => {
                if (!userScore)
                    return res.sendStatus(404); // name doesn't exist

                return userScore.validatePassword(req.body.password)
                    .then(isValid => {
                        if (isValid) {
                            const payload = { id: userScore._id };
                            const token = jwt.encode(payload, cfg.JWT_SECRET);
                            res.status(200).json(token);
                        } else {
                            res.sendStatus(401);
                        }
                    });
            })
            .catch(() => res.sendStatus(500));
    }
    res.sendStatus(401);
});

accountRouter.post('/register', (req, res) => {
    // Account (username/name/whatever) registration -- returns the relevant
    // JWT for the newly-created account

    if (!(req.body.name && req.body.password))
        return res.status(400).json({error: 'Requests need `name` and `password`'});
    if (req.body.password.trim().length < 6)
        return res.status(400).json({error: 'Password must be at least six non-whitespace characters long'});

    let exists;
    return UserScore.findOne({name: req.body.name})
        .then(exists => {
            if (exists)
                return res.sendStatus(409); // name conflict
        })
        .then(() => UserScore.hashPassword(req.body.password)
              .then(hashed => {
                  UserScore
                      .create({
                          name: req.body.name,
                          password: hashed,
                          scores: {},
                      })
                      .then((userScore) => {
                          const payload = { id: userScore._id };
                          const token = jwt.encode(payload, cfg.JWT_SECRET);
                          res.status(201).json(token);
                      })
                      .catch(() => res.sendStatus(500));
              }));
});

accountRouter.put('/change-password', auth.authenticate(), (req, res) => {
    // Update password
    if (!(req.body.name && req.body.newPassword))
        return res.status(400).json({error: 'Requests need `name` and `newPassword`'});
    if (req.body.newPassword.trim().length < 6)
        return res.status(400).json({error: 'Password must be at least six non-whitespace characters long'});

    const _id = req.user.id;
    return UserScore
        .findById(_id)
        .then(record => {
            if (record.name !== req.body.name)
                return res.status(400).json({error: 'Authenticated `name`, URL name, and request body don\'t match'});

            return UserScore.hashPassword(req.body.newPassword)
                .then(hashed => {
                    UserScore
                        .update(
                            { _id },
                            { $set: { 'password': hashed }},
                            { runValidators: true }
                        )
                        .then(() => res.sendStatus(204))
                        .catch(() => res.sendStatus(500));
                });
        });
});

accountRouter.delete('/', auth.authenticate(), (req, res) => {
    // endpoint for deleting our account
    return UserScore
        .findById(req.user.id)
        .exec()
        .then(record => {
            if (record.name !== req.body.name)
                return res.status(400).json({error: 'Authenticated `name`, URL name, and request body don\'t match'});

            return record.validatePassword(req.body.password);


            UserScore.remove({_id: req.user.id})
                .then(thing => {
                    if (thing.result.n)
                        res.sendStatus(200);
                    else
                        res.sendStatus(404);
                });
        })
        .catch(() => res.sendStatus(500));
});

module.exports = {accountRouter};
