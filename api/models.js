// Schema and wrapper methods for user scores

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });

const individualScoreSchema = mongoose.Schema(
    {
        totalClicks: {
            type: Number,
            required: true,
        },
        nAnsweredRight: {
            type: Number,
            required: true,
        },
        nQuestionNumber: {
            type: Number,
            required: true,
        },
        winRatio: {
            type: Number,
            require: true,
        },
    }
);

const userScoreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (str) => /[a-zA-Z0-9_]+/.exec(str)[0] === str,
            message: 'Poorly-formed name'
        },
    },
    password: {
        type: String,
        require: true,
        trim: true,
    },
    scores: {
        easyMajor: individualScoreSchema,
        easyMajorInv: individualScoreSchema,

        easyMinor: individualScoreSchema,
        easyMinorInv: individualScoreSchema,

        intermediateMinor: individualScoreSchema,
        intermediateMinorInv: individualScoreSchema,

        hardMajor: individualScoreSchema,
        hardMajorInv: individualScoreSchema,

        hardMinor: individualScoreSchema,
        hardMinorInv: individualScoreSchema,

        allChords: individualScoreSchema,
        allChordsInv: individualScoreSchema,

        type: Object,
        required: true,
    }
});

userScoreSchema.methods.validatePassword = function(password) {
    return bcrypt
        .compare(password, this.password)
        .then(isValid => isValid);
};

userScoreSchema.statics.hashPassword = function(password) {
    return bcrypt
        .hash(password.trim(), 10)
        .then(hash => hash);
};

userScoreSchema.methods.apiRepr = function() {
    return {
        name: this.name,
        scores: this.scores,
    };
};

// mongoose automagically pluralizes its model names for you. Thanks, mongoose!
const UserScore = mongoose.model('UserScore', userScoreSchema);

module.exports = {UserScore};
