import { httpPostReqLogIn, httpGetReqUserScores, httpGetReqHighScores,
         httpPostReqAccount, httpPutReqUserScores, httpPutReqAccountPassword,
         httpDeleteReqAccount } from '../apiCalls';

import * as types from './apiActionTypes';

// The logInSuccess, logOff, makeUserAccount actions success all update
// `authToken` and `name` fields in localStorage. These are retrieved as our
// initial state for our reducer.

export function logIn(name, password) {
    return dispatch => {
        dispatch(logInPending());
        return httpPostReqLogIn(name, password)
            .then(token => dispatch(logInSuccess(name, token)))
            .catch((e) => dispatch(logInFailure(e)));
    };
}

export const logInPending = () => ({
    type: types.LOG_IN_PENDING,
});

export const logInSuccess = (name, token) => {
    localStorage.setItem('@WTCD/authToken', token);
    localStorage.setItem('@WTCD/name', name);
    return {
        type: types.LOG_IN_SUCCESS,
        name,
        token,
    };
};

export const logInFailure = (error) => ({
    type: types.LOG_IN_FAILURE,
    error,
});

////////////////////

export const logOff = () => {
    localStorage.removeItem('@WTCD/authToken');
    localStorage.removeItem('@WTCD/name');
    return {
        type: types.LOG_OFF,
    };
};


export function getMyScores(token) {
    return dispatch => {
        dispatch(getMyScoresPending());
        return httpGetReqUserScores(token)
            .then(scores => dispatch(getMyScoresSuccess(scores)))
            .catch((e) => dispatch(getMyScoresFailure(e)));
    };
}

export const getMyScoresPending = () => ({
    type: types.GET_MY_SCORES_PENDING,
});

export const getMyScoresSuccess = (scores) => ({
    type: types.GET_MY_SCORES_SUCCESS,
    scores,
});

export const getMyScoresFailure = (error) => ({
    type: types.GET_MY_SCORES_FAILURE,
    error,
});

////////////////////

export function updateMyScores(token, scores) {
    return dispatch => {
        return httpPutReqUserScores(token, scores)
            .then(() => dispatch(updateMyScoresSuccess(scores)))
            .catch((e) => dispatch(updateMyScoresFailure(e)));
    };
}

export const updateMyScoresSuccess = () => ({
    type: types.UPDATE_MY_SCORES_SUCCESS
});

export const updateMyScoresFailure = (error) => ({
    type: types.UPDATE_MY_SCORES_FAILURE,
    error,
});

////////////////////

export function getHighScores(gameType) {
    return dispatch => {
        dispatch(getHighScoresPending());
        return httpGetReqHighScores(gameType)
            .then(highScores => dispatch(getHighScoresSuccess(highScores, gameType)))
            .catch((e) => dispatch(getHighScoresFailure(e)));
    };
}

export const getHighScoresPending = () => ({
    type: types.GET_HIGH_SCORES_PENDING,
});

export const getHighScoresSuccess = (highScores, gameType) => ({
    type: types.GET_HIGH_SCORES_SUCCESS,
    highScores,
    gameType,
});

export const getHighScoresFailure = (error) => ({
    type: types.GET_HIGH_SCORES_FAILURE,
    error,
});

////////////////////

export function makeUserAccount(name, password) {
    return dispatch => {
        dispatch(makeUserAccountPending());
        return httpPostReqAccount(name, password)
            .then(token => dispatch(makeUserAccountSuccess(name, token)))
            .catch((e) => dispatch(makeUserAccountFailure(e)));
    };
}

export const makeUserAccountPending = () => ({
    type: types.MAKE_USER_ACCOUNT_PENDING,
});

export const makeUserAccountSuccess = (name, token) => {
    localStorage.setItem('@WTCD/authToken', token);
    localStorage.setItem('@WTCD/name', name);
    return {
        type: types.MAKE_USER_ACCOUNT_SUCCESS,
        name,
        token,
    };
};

export const makeUserAccountFailure = (error) => ({
    type: types.MAKE_USER_ACCOUNT_FAILURE,
    error,
});

////////////////////
// This hasn't actually been incorporated into the client \/
export function changeUserPassword(name, password) {
    return dispatch => httpPutReqAccountPassword(name, password)
        .then(() => dispatch(changeUserPasswordSuccess()))
        .catch((e) => dispatch(changeUserPasswordFailure()));
}

export const changeUserPasswordSuccess = () => ({
    type: types.CHANGE_USER_PASSWORD_SUCCESS,
});

export const changeUserPasswordFailure = (error) => ({
    type: types.CHANGE_USER_PASSWORD_FAILURE,
    error,
});

// I've not bothered to write an action for account deletion, because that
// doesn't belong in the MVP client
