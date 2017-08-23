import { getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount }
from '../apiCalls';

const getScores = {
    getUserScores: (name, password) =>
        dispatch => {
            dispatch(getScores.getUserScoresPending());
            return getReqUserScores(name, password)
                .then(scores => dispatch(getScores.getUserScoresSuccess(scores)))
                .catch((e) => dispatch(getScores.getUserScoresFailure(e)));
        },

    GET_USER_SCORES_PENDING: 'GET_USER_SCORES_PENDING',
    getUserScoresPending: () => ({
        type: GET_USER_SCORES_PENDING
    }),

    GET_USER_SCORES_SUCCESS: 'GET_USER_SCORES_SUCCESS',
    getUserScoresSuccess: (scores) => ({
        type: GET_USER_SCORES_SUCCESS,
        scores
    }),

    GET_USER_SCORES_FAILURE: 'GET_USER_SCORES_FAILURE',
    getUserScoresFailure: (error) => ({
        type: GET_USER_SCORES_FAILURE,
        error
    }),
};

export const LOG_OFF = 'LOG_OFF';
export const logOff = () => ({
    type: LOG_OFF
});

const updateScores = {
    updateUserScores: (name, password, scores) =>
        dispatch => putReqUserScores(name, password, scores)
        .then(() => dispatch(updateScores.updateUserScoresSuccess(scores)))
        .catch((e) => dispatch(updateScores.updateUserScoresFailure(e))),

    UPDATE_USER_SCORES_SUCCESS: 'UPDATE_USER_SCORES_SUCCESS',
    updateUserScoresSuccess: () => ({
        type: UPDATE_USER_SCORES_SUCCESS
    }),

    UPDATE_USER_SCORES_FAILURE: 'UPDATE_USER_SCORES_FAILURE',
    updateUserScoresFailure: (error) => ({
        type: UPDATE_USER_SCORES_FAILURE,
        error
    }),
};

const getHighScores_ = {
    getHighScores: (gameType) =>
        dispatch => {
            dispatch(getHighScores_.getHighScoresPending());
            return getReqHighScores(gameType)
                .then(highScores => dispatch(getHighScores_.getHighScoresSuccess(highScores)))
                .catch((e) => dispatch(getHighScores_.getHighScoresFailure(e)));
        },

    GET_HIGH_SCORES_PENDING: 'GET_HIGH_SCORES_PENDING',
    getHighScoresPending: () => ({
        type: GET_HIGH_SCORES_PENDING
    }),

    GET_HIGH_SCORES_SUCCESS: 'GET_HIGH_SCORES_SUCCESS',
    getHighScoresSuccess: (highScores) => ({
        type: GET_HIGH_SCORES_SUCCESS,
        highScores
    }),

    GET_HIGH_SCORES_FAILURE: 'GET_HIGH_SCORES_FAILURE',
    getHighScoresFailure: (error) => ({
        type: GET_HIGH_SCORES_FAILURE,
        error
    }),
}

const makeAccount = {
    makeUserAccount: (name, password) =>
        dispatch => postReqAccount(name, password)
        .then(() => dispatch(makeAccount.makeUserAccountSuccess()))
        .catch(() => dispatch(makeAccount.makeUserAccountFailure())),

    MAKE_USER_ACCOUNT_SUCCESS: 'MAKE_USER_ACCOUNT_SUCCESS',
    makeUserAccountSuccess: () => ({
        type: MAKE_USER_ACCOUNT_SUCCESS
    }),

    MAKE_USER_ACCOUNT_FAILURE: 'MAKE_USER_ACCOUNT_FAILURE',
    makeUserAccountFailure: (error) => ({
        type: MAKE_USER_ACCOUNT_FAILURE,
        error
    }),
};

const changePass = {
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
export const { getUserScores, GET_USER_SCORES_PENDING, getUserScoresPending,
               GET_USER_SCORES_SUCCESS, getUserScoresSuccess,
               GET_USER_SCORES_FAILURE, getUserScoresFailure } = getScores;

export const { updateUserScores, UPDATE_USER_SCORES_SUCCESS,
               updateUserScoresSuccess, UPDATE_USER_SCORES_FAILURE,
               updateUserScoresFailure } = updateScores;

export const { getHighScores, GET_HIGH_SCORES_PENDING, getHighScoresPending,
               GET_HIGH_SCORES_SUCCESS, getHighScoresSuccess,
               GET_HIGH_SCORES_FAILURE, getHighScoresFailure } = getHighScores_;

export const { makeUserAccount, MAKE_USER_ACCOUNT_SUCCESS,
               makeUserAccountSuccess, MAKE_USER_ACCOUNT_FAILURE,
               makeUserAccountFailure } = makeAccount;

export const { changeUserPassword, CHANGE_USER_PASSWORD_SUCCESS,
               changeUserPasswordSuccess, CHANGE_USER_PASSWORD_FAILURE,
               changeUserPasswordFailure } = changePass;
