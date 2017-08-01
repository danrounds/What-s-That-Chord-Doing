// schema and wrapper method(s) for our our journal entries

// const bcrypt = require('bcryptjs'); // leaving this here in case we want to
// implement user accounts (with accompanying password security)
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

// userScoreSchema.methods.apiRepr = function() {
//     return {
//         // id: this._id,
//         name: this.name,
//         totalClicks: this.totalClicks,
//         nAnsweredRight: this.nAnsweredRight,
//         nQuestionNumber: this.nQuestionNumber,
//     };
// };

// mongoose automagically pluralizes its model names for you. Thanks, mongoose!
const UserScore = mongoose.model('UserScore', userScoreSchema);

module.exports = {UserScore};
