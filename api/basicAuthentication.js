const {BasicStrategy} = require('passport-http');

const {UserScore} = require('./models');

const basicStrategy = new BasicStrategy((username, password, cb) => {
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

module.exports = {basicStrategy};
