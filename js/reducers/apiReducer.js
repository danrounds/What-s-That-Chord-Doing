import * as actions from '../actions/apiActions';

const initialState = {
    highScores: [],
    lastHighScoreAccessed: null,
    userScores: {},
    error: null,
    pending: null,
};

function copyUserScores(obj) {
    // Makes a copy of our userScore entr[y|ies] without mutation
    // Now we know why people use `immutable.js`
    if (!obj.name || !obj.scores)
        return Object.assign(obj);

    const newObj = {name: obj.name}, scores = {};
    const keys = Object.keys(obj.scores);
    for (let i in keys) {
        scores[keys[i]] = Object.assign({}, scores[keys[i]], obj.scores[keys[i]]);
    }
    newObj.scores = scores;
    return newObj;
}

function copyHighScores(oldScores) {
    // Makes a copy of our highScores entry, without mutation
    return oldScores.map(score => copyUserScores(score));
}

// Our reducer for the API interaction part of our app
export default (state=initialState, action) => {
    switch(action.type) {

    case 'GET_USER_SCORES_PENDING':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: true,
        };

    case 'GET_USER_SCORES_SUCCESS':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: action.scores,
            error: false,
            pending: false,
        };


    case 'LOG_OFF':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: {},
            error: true,
            pending: false,
        };

    case 'GET_USER_SCORES_FAILURE':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'UPDATE_USER_SCORES_SUCCESS':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'UPDATE_USER_SCORES_FAILURE':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'GET_HIGH_SCORES_PENDING':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: true,
        };

    case 'GET_HIGH_SCORES_SUCCESS':
        return {
            highScores: action.highScores,
            lastHighScoreAccessed: action.gameType,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'GET_HIGH_SCORES_FAILURE':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'MAKE_USER_ACCOUNT_SUCCESS':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: { name: action.name },
            error: false,
            pending: false,
        };

    case 'MAKE_USER_ACCOUNT_FAILURE':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: {},
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        
    case 'CHANGE_USER_PASSWORD_SUCCESS':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'CHANGE_USER_PASSWORD_FAILURE':
        return {
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            userScores: copyUserScores(state.userScores),
            error: true,
            pending: false,
        };

    default:
        return state;
    }
};
