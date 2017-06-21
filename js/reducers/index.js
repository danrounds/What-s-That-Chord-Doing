import * as actions from '../actions/';

let initialState = {
    gameType: null,
    inversions: null,
    keyNameReadable: null,
    keyNameNotation: null,
    introChordSequence: [],
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

export const reducer = (state=initialState, action) => {

    switch(action.type) {

    case actions.START_NEW_GAME:
        return {
            keyValue: null,
            gameType: action.gameType,
            inversions: action.inversions,
            keyNameReadable: action.keyNameReadable,
            keyNameNotation: action.keyNameNotation,
            introChordSequence: action.introChordSequence,
            chordSubset: action.chordSubset,
            chordName: action.chordName,
            chord: action.currentChordNumeral,
            notes: {bass: action.bassNote, treble: action.trebleNotes},
            accidentals: action.accidentals,
            guessN: 0,
            answeredCorrectly: false,
            questionNumber: 1,
            nAnsweredRight: 0,
            clicksPerRightAnswer: [],
            gameOver: false
        };

    case actions.GET_KEY_PRESS:
        console.log(action.keyValue);
        return {
            keyValue: action.keyValue,
            gameType: state.gameType,
            inversions: state.inversions,
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chordSubset: [...state.chordSubset],
            chordName: state.chordName,
            chord: state.chord,
            notes: {
                bass: state.notes.bass,
                treble: [...state.notes.treble]
            },
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guessN: state.guessN,
            answeredCorrectly: state.answeredCorrectly,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: state.gameOver
        };


    case actions.GET_NEXT_QUESTION:
        return {
            keyValue: null,
            gameType: state.gameType,
            inversions: state.inversions,
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chordSubset: [...state.chordSubset],
            chordName: action.chordName,
            chord: action.currentChordNumeral,
            notes: {bass: action.bassNote, treble: [...action.trebleNotes]},
            accidentals: {
                bassAccidental: action.accidentals.bassAccidental,
                trebleIndices: [...action.accidentals.trebleIndices]
            },
            guessN: 0,
            answeredCorrectly: false,
            questionNumber: (state.questionNumber + 1) % 11,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: false
        };

    case actions.INCREMENT_GUESS_N:
        return {
            keyValue: null,
            gameType: state.gameType,
            inversions: state.inversions,
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chordSubset: [...state.chordSubset],
            chordName: state.chordName,
            chord: state.chord,
            notes: {
                bass: state.notes.bass,
                treble: [...state.notes.treble]
            },
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guessN: state.guessN + 1,
            answeredCorrectly: false,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: false
        };

    case actions.MARK_TURN_CORRECT:
        let gameOver = state.questionNumber === 10 ? true : false;
        return {
            keyValue: null,
            gameType: state.gameType,
            inversions: state.inversions,
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chordSubset: [...state.chordSubset],
            chordName: state.chordName,
            chord: state.chord,
            notes: {
                bass: state.notes.bass,
                treble: [...state.notes.treble]
            },
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guessN: state.guessN++,
            answeredCorrectly: true,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight + 1,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer, state.guessN],
            gameOver
        };

    default:
        return state;
    }
};
