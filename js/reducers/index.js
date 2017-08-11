import gameReducer from './gameReducer';
import apiReducer from './apiReducer';

let initialState = {
    lessonIndexDisplay: {easy: false, novice: false, difficult: false, i: 0},
    keyValue: null,
    displayKeyboardShortcuts: null,
    gameType: null,
    inversions: null,
    keyNameReadable: null,
    keyNameNotation: null,
    introChordSequence: [[],[],[],[]],
    chordSubset: [],
    chordName: null,
    chord: null,
    notes: {bass: null, treble: []},
    accidentals: {bassAccidental: null, trebleIndices: []},
    guessN: 0,
    answeredCorrectly: null,
    questionNumber: 0,
    nAnsweredRight: 0,
    clicksPerRightAnswer: [],
    gameOver: false
};

export const reducer = (state=initialState, action) =>
    apiReducer(gameReducer(state, action), action);
