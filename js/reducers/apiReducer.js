import * as actions from '../actions/apiActions';

const initialState = {
    highScores: null,
    userScores: null,
    error: null,
}

// Our reducer for the API interaction part of our app
export default (state=initialState, action) => {
    switch(action.type) {

    case 'GET_USER_SCORES_PENDING':
        return {
            userScores: 'pending'
        };

    case 'GET_USER_SCORES_SUCCESS':
        return {
            userScores: action.scores
        };

    case 'GET_USER_SCORES_FAILURE':
        return {
            userScores: {},
            userScores: action.error
        };

    case 'UPDATE_USER_SCORES_SUCCESS':
    case 'UPDATE_USER_SCORES_FAILURE':

    case 'GET_HIGH_SCORES_PENDING':
    case 'GET_HIGH_SCORES_SUCCESS':
    case 'GET_HIGH_SCORES_FAILURE':

    case 'MAKE_USER_ACCOUNT_SUCCESS':
    case 'MAKE_USER_ACCOUNT_FAILURE':

        
    case 'CHANGE_USER_PASSWORD_SUCCESS':
    case 'CHANGE_USER_PASSWORD_FAILURE':


    default:
        return state;
    }
};
