import * as actions from '../actions/gameActions';

const initialState = {
    keyValue: null,
    gameType: null,
    gameNumber: null,
    inversions: null,
    keyNameReadable: null,
    keyNameNotation: null,
    introChordSequence: [ [],[],[],[] ],
    chordSubset: [],
    chordName: null,
    chord: null,
    notes: { bass: null, treble: [] },
    inversionN: null,
    accidentals: { bassAccidental: null, trebleIndices: [] },
    guess: null,
    guessN: 0,
    answeredCorrectly: null,
    giveUp: null,
    questionNumber: 0,
    nAnsweredRight: 0,
    clicksPerRightAnswer: [],
    gameOver: false,
};

// Our reducer for the game-play/keyboard-shortcut part of our app:
export default (state=initialState, action) => {

    switch(action.type) {

    case actions.SET_KEY_PRESS:
        return {
            keyValue: action.keyValue,
            gameType: state.gameType,
            gameNumber: state.gameNumber,
            inversions: state.inversions,
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chordSubset: [ ...state.chordSubset ],
            chordName: state.chordName,
            chord: state.chord,
            notes: {
                bass: state.notes.bass,
                treble: [...state.notes.treble]
            },
            inversionN: state.inversionN,
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices],
            },
            guess: state.guess,
            guessN: state.guessN,
            answeredCorrectly: state.answeredCorrectly,
            giveUp: state.giveUp,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: state.gameOver
        };

    case actions.START_NEW_GAME:
        return {
            keyValue: '',
            gameType: action.gameType,
            gameNumber: action.gameNumber,
            inversions: action.inversions,
            keyNameReadable: action.keyNameReadable,
            keyNameNotation: action.keyNameNotation,
            introChordSequence: action.introChordSequence,
            chordSubset: action.chordSubset,
            chordName: action.chordName,
            chord: action.currentChordNumeral,
            notes: { bass: action.bassNote, treble: action.trebleNotes },
            inversionN: action.inversionN,
            accidentals: action.accidentals,
            guess: null,
            guessN: 0,
            answeredCorrectly: false,
            giveUp: false,
            questionNumber: 1,
            nAnsweredRight: 0,
            clicksPerRightAnswer: [],
            gameOver: false
        };

    case actions.GIVE_UP:
        return {
            keyValue: '',
            gameType: state.gameType,
            gameNumber: state.gameNumber,
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
            inversionN: state.inversionN,
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guess: null,
            guessN: 0,
            answeredCorrectly: false,
            giveUp: true,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: state.questionNumber === 10 ? true : false,
        };

    case actions.GET_NEXT_QUESTION:
        return {
            keyValue: '',
            gameType: state.gameType,
            gameNumber: state.gameNumber,
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
            notes: { bass: action.bassNote, treble: [...action.trebleNotes] },
            inversionN: action.inversionN,
            accidentals: {
                bassAccidental: action.accidentals.bassAccidental,
                trebleIndices: [...action.accidentals.trebleIndices]
            },
            guess: null,
            guessN: 0,
            answeredCorrectly: false,
            giveUp: false,
            questionNumber: (state.questionNumber + 1) % 11,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: false
        };

    case actions.MAKE_GUESS:
        return {
            keyValue: '',
            gameType: state.gameType,
            gameNumber: state.gameNumber,
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
            inversionN: state.inversionN,
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guess: action.guess,
            guessN: state.guessN + 1,
            answeredCorrectly: false,
            giveUp: state.giveUp,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer],
            gameOver: false
        };

    case actions.MARK_TURN_CORRECT:
        return {
            keyValue: '',
            gameType: state.gameType,
            gameNumber: state.gameNumber,
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
            inversionN: state.inversionN,
            accidentals: {
                bassAccidental: state.accidentals.bassAccidental,
                trebleIndices: [...state.accidentals.trebleIndices]
            },
            guess: state.guess,
            guessN: state.guessN,
            answeredCorrectly: true,
            questionNumber: state.questionNumber,
            nAnsweredRight: state.nAnsweredRight + 1,
            clicksPerRightAnswer: [...state.clicksPerRightAnswer, state.guessN],
            gameOver: state.questionNumber === 10 ? true : false,
        };

    default:
        return state;
    }
};
