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

export const getUserScores = (name, password) => {
    dispatch => {
        dispatch(getUserScoresPending());
        return getReqUserScores(name, password)
            .then(scores => dispatch(getUserScoresSuccess(scores)))
            .catch((e) => dispatch(getUserScoresFailure(e)));
    };
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

// export const updateUserScores = (name, password, scores) => {
//     dispatch => putReqUserScores(name, password, scores)
//         .then(scores => dispatch())
// }

export const getHighScores = (gameType) => {
    dispatch => {
        dispatch(getHighScoresPending());
        return getReqHighScores(gameType)
            .then(highScores => dispatch(getHighScoresSuccess()))
            .catch((e) => dispatch(getHighScoresFailure()));
    };
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
})

