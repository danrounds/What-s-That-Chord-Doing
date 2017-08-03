// Schema and wrapper methods for user scores

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

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

const userScoreSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (str) => /[a-zA-Z0-9_]+/.test(str),
                message: 'Poorly-formed name'
            },
        },
        password: {
            type: String,
            require: true,
        },
        scores: {
            easyMajor: individualScoreSchema,
            easyMajorInvs: individualScoreSchema,

            easyMinor: individualScoreSchema,
            easyMinorInvs: individualScoreSchema,

            intermediateMinor: individualScoreSchema,
            intermediateMinorInvs: individualScoreSchema,

            hardMajor: individualScoreSchema,
            hardMajorInvs: individualScoreSchema,

            hardMinor: individualScoreSchema,
            hardMinorInvs: individualScoreSchema,

            allChords: individualScoreSchema,
            allChordsInvs: individualScoreSchema,

            type: Object,
            required: true,
        }
    }
);

userScoreSchema.methods.validatePassword = function(password) {
    return bcrypt
        .compare(password, this.password)
        .then(isValid => isValid);
};

userScoreSchema.statics.hashPassword = function(password) {
    return bcrypt
        .hash(password, 10)
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
