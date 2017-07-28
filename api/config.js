exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://localhost/what-s-this-chord-doing-scores';

exports.TEST_DATABASE_URL =
    process.env.TEST_DATABASE_URL ||
    'mongodb://localhost/what-s-this-chord-doing-scores';

exports.PORT = process.env.PORT
    || 8081;
