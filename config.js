module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || global.DATABASE_URL
        || 'mongodb://localhost/what-s-this-chord-doing-scores',

    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL
        || 'mongodb://localhost/what-s-this-chord-doing-scores-test',

    PORT: process.env.PORT || 8080,

    JWT_SECRET: process.env.JWT_SECRET || 's3cret_r3dux',
    JWT_SESSION: { session: false },
};
