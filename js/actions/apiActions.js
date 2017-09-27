import { postReqLogIn, getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount }
from '../apiCalls';

// The logInSuccess, logOff, makeUserAccount actions success all update
// `authToken` and `name` fields in localStorage. These are retrieved as our
// initial state for our reducer.

const logIn_ = {
    logIn: (name, password) =>
        dispatch => {
            dispatch(logIn_.logInPending());
            return postReqLogIn(name, password)
                .then(token => dispatch(logIn_.logInSuccess(name, token)))
                .catch((e) => dispatch(logIn_.logInFailure(e)));
        },

    LOG_IN_PENDING: 'LOG_IN_PENDING',
    logInPending: () => ({
        type: LOG_IN_PENDING,
    }),

    LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
    logInSuccess: (name, token) => {
        localStorage.setItem('@WTCD/authToken', token);
        localStorage.setItem('@WTCD/name', name);
        return {
            type: LOG_IN_SUCCESS,
            name,
            token,
        };
    },

    LOG_IN_FAILURE: 'LOG_IN_FAILURE',
    logInFailure: (error) => ({
        type: LOG_IN_FAILURE,
        error,
    }),
};

export const LOG_OFF = 'LOG_OFF';
export const logOff = () => {
    localStorage.removeItem('@WTCD/authToken');
    localStorage.removeItem('@WTCD/name');
    return {
        type: LOG_OFF
    };
};

const getScores = {
    getMyScores: (token) =>
        dispatch => {
            dispatch(getScores.getMyScoresPending());
            return getReqUserScores(token)
                .then(scores => dispatch(getScores.getMyScoresSuccess(scores)))
                .catch((e) => dispatch(getScores.getMyScoresFailure(e)));
        },

    GET_MY_SCORES_PENDING: 'GET_MY_SCORES_PENDING',
    getMyScoresPending: () => ({
        type: GET_MY_SCORES_PENDING
    }),

    GET_MY_SCORES_SUCCESS: 'GET_MY_SCORES_SUCCESS',
    getMyScoresSuccess: (scores) => ({
        type: GET_MY_SCORES_SUCCESS,
        scores
    }),

    GET_MY_SCORES_FAILURE: 'GET_MY_SCORES_FAILURE',
    getMyScoresFailure: (error) => ({
        type: GET_MY_SCORES_FAILURE,
        error
    }),
};

const updateScores = {
    updateMyScores: (token, scores) =>
        dispatch => putReqUserScores(token, scores)
        .then(() => dispatch(updateScores.updateMyScoresSuccess(scores)))
        .catch((e) => dispatch(updateScores.updateMyScoresFailure(e))),

    UPDATE_MY_SCORES_SUCCESS: 'UPDATE_MY_SCORES_SUCCESS',
    updateMyScoresSuccess: () => ({
        type: UPDATE_MY_SCORES_SUCCESS
    }),

    UPDATE_MY_SCORES_FAILURE: 'UPDATE_MY_SCORES_FAILURE',
    updateMyScoresFailure: (error) => ({
        type: UPDATE_MY_SCORES_FAILURE,
        error
    }),
};

const getHighScores_ = {
    getHighScores: (gameType) =>
        dispatch => {
            dispatch(getHighScores_.getHighScoresPending());
            return getReqHighScores(gameType)
                .then(highScores => dispatch(getHighScores_.getHighScoresSuccess(highScores, gameType)))
                .catch((e) => dispatch(getHighScores_.getHighScoresFailure(e)));
        },

    GET_HIGH_SCORES_PENDING: 'GET_HIGH_SCORES_PENDING',
    getHighScoresPending: () => ({
        type: GET_HIGH_SCORES_PENDING
    }),

    GET_HIGH_SCORES_SUCCESS: 'GET_HIGH_SCORES_SUCCESS',
    getHighScoresSuccess: (highScores, gameType) => ({
        type: GET_HIGH_SCORES_SUCCESS,
        highScores,
        gameType
    }),

    GET_HIGH_SCORES_FAILURE: 'GET_HIGH_SCORES_FAILURE',
    getHighScoresFailure: (error) => ({
        type: GET_HIGH_SCORES_FAILURE,
        error
    }),
}

const makeAccount = {
    makeUserAccount: (name, password) =>
        dispatch => {
            dispatch(makeAccount.makeUserAccountPending());
            return postReqAccount(name, password)
                .then(token => dispatch(makeAccount.makeUserAccountSuccess(name, token)))
                .catch((e) => dispatch(makeAccount.makeUserAccountFailure(e)));
        },

    MAKE_USER_ACCOUNT_PENDING: 'MAKE_USER_ACCOUNT_PENDING',
    makeUserAccountPending: () => ({
        type: MAKE_USER_ACCOUNT_PENDING,
    }),

    MAKE_USER_ACCOUNT_SUCCESS: 'MAKE_USER_ACCOUNT_SUCCESS',
    makeUserAccountSuccess: (name, token) => {
        localStorage.setItem('@WTCD/authToken', token);
        localStorage.setItem('@WTCD/name', name);
        return {
            type: MAKE_USER_ACCOUNT_SUCCESS,
            name,
            token,
        };
    },

    MAKE_USER_ACCOUNT_FAILURE: 'MAKE_USER_ACCOUNT_FAILURE',
    makeUserAccountFailure: (error) => ({
        type: MAKE_USER_ACCOUNT_FAILURE,
        error,
    }),
};

const changePass = {
    // This hasn't actually been incorporated into the client
    changeUserPassword: (name, password) =>
        dispatch => putReqAccountPassword(name, password)
        .then(() => dispatch(changePass.changeUserPasswordSuccess()))
        .catch((e) => dispatch(changePass.changeUserPasswordFailure())),

    CHANGE_USER_PASSWORD_SUCCESS: 'CHANGE_USER_PASSWORD_SUCCESS',
    changeUserPasswordSuccess: () => ({
        type: CHANGE_USER_PASSWORD_SUCCESS
    }),

    CHANGE_USER_PASSWORD_FAILURE: 'CHANGE_USER_PASSWORD_FAILURE',
    changeUserPasswordFailure: (error) => ({
        type: CHANGE_USER_PASSWORD_FAILURE,
        error
    }),
};

///
///
// I've not bothered to write an action for account deletion, because that
// doesn't belong in the MVP client

// We end up with a bit more code by grouping associated actions together, but
// it at least tells us which goes with which
export const { logIn, LOG_IN_PENDING, logInPending, LOG_IN_SUCCESS,
               logInSuccess, LOG_IN_FAILURE, logInFailure } = logIn_;

export const { getMyScores, GET_MY_SCORES_PENDING, getMyScoresPending,
               GET_MY_SCORES_SUCCESS, getMyScoresSuccess,
               GET_MY_SCORES_FAILURE, getMyScoresFailure } = getScores;

export const { updateMyScores, UPDATE_MY_SCORES_SUCCESS,
               updateMyScoresSuccess, UPDATE_MY_SCORES_FAILURE,
               updateMyScoresFailure } = updateScores;

export const { getHighScores, GET_HIGH_SCORES_PENDING, getHighScoresPending,
               GET_HIGH_SCORES_SUCCESS, getHighScoresSuccess,
               GET_HIGH_SCORES_FAILURE, getHighScoresFailure } = getHighScores_;

export const { makeUserAccount,MAKE_USER_ACCOUNT_PENDING,makeUserAccountPending,
               MAKE_USER_ACCOUNT_SUCCESS, makeUserAccountSuccess,
               MAKE_USER_ACCOUNT_FAILURE,makeUserAccountFailure } = makeAccount;

export const { changeUserPassword, CHANGE_USER_PASSWORD_SUCCESS,
               changeUserPasswordSuccess, CHANGE_USER_PASSWORD_FAILURE,
               changeUserPasswordFailure } = changePass;
