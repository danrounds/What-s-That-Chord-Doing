import * as actions from '../actions/apiActions';

const initialState = {
    highScores: null,
    userScores: null,
    error: null,
    pending: null,
};

function copyUserScores(obj, newObj={ name: obj.name }) {
    const newScores = {};
    for (let key of Object.keys(obj.scores)) {
        newScores[key] = {};
        Object.assign(newScores[key], obj.scores[key]);
    }
    newObj.scores = newScores;
    return newObj;
}

function copyHighScores(oldScores) {
    oldScores.map();
}

// Our reducer for the API interaction part of our app
export default (state=initialState, action) => {
    switch(action.type) {

    case 'GET_USER_SCORES_PENDING':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: true,
        };

    case 'GET_USER_SCORES_SUCCESS':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: action.scores,
            error: false,
            pending: false,
        };

    case 'GET_USER_SCORES_FAILURE':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'UPDATE_USER_SCORES_SUCCESS':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'UPDATE_USER_SCORES_FAILURE':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'GET_HIGH_SCORES_PENDING':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: true,
        };

    case 'GET_HIGH_SCORES_SUCCESS':
        return {
            highScores: action.highScores,
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'GET_HIGH_SCORES_FAILURE':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////

    case 'MAKE_USER_ACCOUNT_SUCCESS':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'MAKE_USER_ACCOUNT_FAILURE':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: action.error,
            pending: false,
        };

        //////////////////////////////////////////////
        //////////////////////////////////////////////
        
    case 'CHANGE_USER_PASSWORD_SUCCESS':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: false,
            pending: false,
        };

    case 'CHANGE_USER_PASSWORD_FAILURE':
        return {
            highScores: 'PUT SOMETHING ELSE HERE',
            userScores: copyUserScores(state.userScores),
            error: true,
            pending: false,
        };

    default:
        return state;
    }
};
