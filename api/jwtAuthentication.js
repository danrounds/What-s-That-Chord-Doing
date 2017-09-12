const passport = require('passport');
const passportJwt = require('passport-jwt');

const {UserScore} = require('./models');
const cfg = require('./config');

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;

let params = {
    secretOrKey: cfg.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

module.exports = (() => {
    let strategy = new Strategy(params, (payload, done) => {

        UserScore
            .findById(payload.id)
            .exec()
            .then(userScore => {
                if (userScore)
                    return done(null, { id: userScore.id });
                else
                    return done(new Error('User not found'), null);
            });
    });

    passport.use(strategy);
    return {
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', cfg.JWT_SESSION),
    };
})();
