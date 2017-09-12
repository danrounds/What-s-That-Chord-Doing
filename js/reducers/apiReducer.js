import * as actions from '../actions/apiActions';

// Not only do we define actions for dispatching to our reducer, here, we also
// update `localStorage`, on logIn/account-creation and retrieve from it when we
// start our app

const initialState = {
    authToken: localStorage.getItem('authToken'),
    name: localStorage.getItem('name'),
    highScores: [],
    lastHighScoreAccessed: null,
    myScores: {},
    error: null,
    pending: null,
};

function copyMyScores(obj) {
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
    return oldScores.map(score => copyMyScores(score));
}

// Our reducer for the API interaction part of our app
export default (state=initialState, action) => {
    switch(action.type) {
        
    case 'LOG_IN_SUCCESS':
        localStorage.setItem('authToken', action.token);
        localStorage.setItem('name', action.name);
        return {
            authToken: action.token,
            name: action.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: false,
            pending: false,
        };

    case 'LOG_IN_FAILURE':
        return {
            authToken: null,
            name: null,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: action.error,
            pending: false,
        };


    case 'LOG_OFF':
        localStorage.setItem('authToken', JSON.stringify(null));
        localStorage.setItem('name', JSON.stringify(null));
        return {
            authToken: null,
            name: null,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: {},
            error: false,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'LOG_IN_PENDING':
    case 'GET_MY_SCORES_PENDING':
    case 'GET_HIGH_SCORES_PENDING':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: false,
            pending: true,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'GET_MY_SCORES_SUCCESS':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: action.scores,
            error: false,
            pending: false,
        };

    case 'GET_MY_SCORES_FAILURE':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'UPDATE_MY_SCORES_SUCCESS':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: false,
            pending: false,
        };

    case 'UPDATE_MY_SCORES_FAILURE':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'GET_HIGH_SCORES_SUCCESS':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: action.highScores,
            lastHighScoreAccessed: action.gameType,
            myScores: copyMyScores(state.myScores),
            error: false,
            pending: false,
        };

    case 'GET_HIGH_SCORES_FAILURE':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'MAKE_USER_ACCOUNT_SUCCESS':
        localStorage.setItem('authToken', action.token);
        localStorage.setItem('name', action.name);
        return {
            authToken: action.token,
            name: action.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: { name: action.name },
            error: false,
            pending: false,
        };

    case 'MAKE_USER_ACCOUNT_FAILURE':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: {},
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        
    case 'CHANGE_USER_PASSWORD_SUCCESS':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: false,
            pending: false,
        };

    case 'CHANGE_USER_PASSWORD_FAILURE':
        return {
            authToken: state.authToken,
            name: state.name,
            highScores: copyHighScores(state.highScores),
            lastHighScoreAccessed: state.lastHighScoreAccessed,
            myScores: copyMyScores(state.myScores),
            error: true,
            pending: false,
        };

    default:
        return state;
    }
};
