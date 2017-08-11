import chordGetter from '../musicLogic/';
import { getReqUserScores, getReqHighScores, postReqAccount,
         putReqUserScores, putReqAccountPassword, deleteReqAccount }
from 'apiCalls';

export const UPDATE_LESSON_INDEX_DISPLAY = 'UPDATE_LESSON_INDEX_DISPLAY';
export const updateLessonIndexDisplay = (keyValueToUpdate) => ({
    type: UPDATE_LESSON_INDEX_DISPLAY,
    keyValueToUpdate
});

export const GET_KEY_PRESS = 'GET_KEY_PRESS';
export const getKeyPress = (keyValue) => ({
    type: GET_KEY_PRESS,
    keyValue
});

export const TOGGLE_KEYBOARD_SHORTCUT_DISPLAY = 'TOGGLE_KEYBOARD_SHORTCUT_DISPLAY';
export const toggleKeyboardShortcutDisplay = (displayBool) => ({
    type: TOGGLE_KEYBOARD_SHORTCUT_DISPLAY,
    displayBool
});

export const START_NEW_GAME = 'START_NEW_GAME';
export const startNewGame = (gameType, inversions) => {
    let {keyNameReadable, keyNameNotation, introChordSequence, chordSubset} =
            chordGetter.init(gameType, inversions);
    let {chordName, currentChordNumeral, bassNote, trebleNotes, accidentals} =
            chordGetter.getChord();
    return {
        type: START_NEW_GAME,
        gameType,
        inversions,
        keyNameReadable,
        keyNameNotation,
        introChordSequence,
        chordSubset,
        chordName,
        currentChordNumeral,
        bassNote,
        trebleNotes,
        accidentals
    };
};

export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const getNextQuestion = () => {
    let {chordName, currentChordNumeral, bassNote, trebleNotes, accidentals} =
            chordGetter.getChord();
    return {
        type: GET_NEXT_QUESTION,
        chordName,
        currentChordNumeral,
        bassNote,
        trebleNotes,
        accidentals
    };
};

export const INCREMENT_GUESS_N = 'INCREMENT_GUESS_N';
export const incrementGuessN = () => ({
    type: INCREMENT_GUESS_N
});

export const MARK_TURN_CORRECT = 'MARK_TURN_CORRECT';
export const markTurnCorrect = () => ({
    type: MARK_TURN_CORRECT
});
///
///

export const getUserScores = (name, password) =>
    dispatch => {
        dispatch(getUserScoresPending());
        return getReqUserScores(name, password)
            .then(scores => dispatch(getUserScoresSuccess(scores)))
            .catch((e) => dispatch(getUserScoresFailure(e)));
};

export const GET_USER_SCORES_PENDING = 'GET_USER_SCORES_PENDINGS';
export const getUserScoresPending = () => ({
    type: GET_USER_SCORES_PENDING
});

export const GET_USER_SCORES_SUCCESS = 'GET_USER_SCORES_SUCCESS';
export const getUserScoresSuccess = (scores) => ({
    type: GET_USER_SCORES_SUCCESS,
    scores
});

export const GET_USER_SCORES_FAILURE = 'GET_USER_SCORES_FAILURE';
export const getUserScoresFailure = (error) => ({
    type: GET_USER_SCORES_FAILURE,
    error
});
///
///

export const updateUserScores = (name, password, scores) =>
    dispatch => putReqUserScores(name, password, scores)
        .then(() => dispatch(updateUserScoresSuccess()))
        .catch((e) => dispatch(updateUserScoresFailure()));

export const UPDATE_USER_SCORES_SUCCESS = 'UPDATE_USER_SCORES_SUCCESS';
export const updateUserScoresSuccess = () => ({
    type: UPDATE_USER_SCORES_SUCCESS
});

export const UPDATE_USER_SCORES_FAILURE = 'UPDATE_USER_SCORES_FAILURE';
export const updateUserScoresFailure = (error) => ({
    type: UPDATE_USER_SCORES_FAILURE,
    error
});
///
///

export const getHighScores = (gameType) =>
    dispatch => {
        dispatch(getHighScoresPending());
        return getReqHighScores(gameType)
            .then(highScores => dispatch(getHighScoresSuccess()))
            .catch((e) => dispatch(getHighScoresFailure()));
    };

export const GET_HIGH_SCORES_PENDING = 'GET_HIGH_SCORES_PENDING';
export const getHighScoresPending = () => ({
    type: GET_HIGH_SCORES_PENDING
});

export const GET_HIGH_SCORES_SUCCESS = 'GET_HIGH_SCORES_SUCCESS';
export const getHighScoresSuccess = (highScores) => ({
    type: GET_HIGH_SCORES_SUCCESS,
    highScores
});

export const GET_HIGH_SCORES_FAILURE = 'GET_HIGH_SCORES_FAILURE';
export const getHighScoresFailure = (error) => ({
    type: GET_HIGH_SCORES_FAILURE,
    error
});
///
///

export const makeUserAccount = (name, password) =>
    dispatch => postReqAccount(name, password)
    .then(() => dispatch(makeUserAccountSuccess()))
    .catch(() => dispatch(makeUserAccountFailure()));

export const MAKE_USER_ACCOUNT_SUCCESS = 'MAKE_USER_ACCOUNT_SUCCESS';
export const makeUserAccountSuccess = () => ({
    type: MAKE_USER_ACCOUNT_SUCCESS
});

export const MAKE_USER_ACCOUNT_FAILURE = 'MAKE_USER_ACCOUNT_FAILURE';
export const makeUserAccountFailure = (error) => ({
    type: MAKE_USER_ACCOUNT_FAILURE,
    error
});

///
///
export const changeUserPassword = (name, password) =>
    dispatch => putReqAccountPassword(name, password)
    .then(() => dispatch(changeUserPasswordSuccess()))
    .catch((e) => dispatch(changeUserPasswordFailure()));

export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';
export const changeUserPasswordSuccess = () => ({
    type: CHANGE_USER_PASSWORD_SUCCESS
});

export const CHANGE_USER_PASSWORD_FAILURE = 'CHANGE_USER_PASSWORD_FAILURE';
export const changeUserPasswordFailure = (error) => ({
    type: CHANGE_USER_PASSWORD_FAILURE,
    error
});

///
///
// I've not bothered to write an action for account deletion, because that
// doesn't belong in the MVP client
