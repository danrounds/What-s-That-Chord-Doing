import { httpGetReqUserScores, httpGetReqHighScores, httpPutReqUserScores } from '../../apiCalls';
import * as types from './types';

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
