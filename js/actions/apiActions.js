import { getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount }
from '../apiCalls';

const getScores = {
    getMyScores: (name, password) =>
        dispatch => {
            dispatch(getScores.getMyScoresPending());
            return getReqUserScores(name, password)
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

export const LOG_OFF = 'LOG_OFF';
export const logOff = () => ({
    type: LOG_OFF
});

const updateScores = {
    updateMyScores: (name, password, scores) =>
        dispatch => putReqUserScores(name, password, scores)
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
        dispatch => postReqAccount(name, password)
        .then(() => dispatch(makeAccount.makeUserAccountSuccess(name)))
        .catch((e) => dispatch(makeAccount.makeUserAccountFailure(e))),

    MAKE_USER_ACCOUNT_SUCCESS: 'MAKE_USER_ACCOUNT_SUCCESS',
    makeUserAccountSuccess: (name) => ({
        type: MAKE_USER_ACCOUNT_SUCCESS,
        name
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
export const { getMyScores, GET_MY_SCORES_PENDING, getMyScoresPending,
               GET_MY_SCORES_SUCCESS, getMyScoresSuccess,
               GET_MY_SCORES_FAILURE, getMyScoresFailure } = getScores;

export const { updateMyScores, UPDATE_MY_SCORES_SUCCESS,
               updateMyScoresSuccess, UPDATE_MY_SCORES_FAILURE,
               updateMyScoresFailure } = updateScores;

export const { getHighScores, GET_HIGH_SCORES_PENDING, getHighScoresPending,
               GET_HIGH_SCORES_SUCCESS, getHighScoresSuccess,
               GET_HIGH_SCORES_FAILURE, getHighScoresFailure } = getHighScores_;

export const { makeUserAccount, MAKE_USER_ACCOUNT_SUCCESS,
               makeUserAccountSuccess, MAKE_USER_ACCOUNT_FAILURE,
               makeUserAccountFailure } = makeAccount;

export const { changeUserPassword, CHANGE_USER_PASSWORD_SUCCESS,
               changeUserPasswordSuccess, CHANGE_USER_PASSWORD_FAILURE,
               changeUserPasswordFailure } = changePass;
