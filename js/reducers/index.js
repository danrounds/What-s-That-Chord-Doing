import * as actions from '../actions/';

let initialState = {
    keyNameReadable: null,
    keyNameNotation: null,
    introChordSequence: [],
    chord: null,
    notes: {bass: null, treble: []},
    accidentals: {bassAccidental: null, trebleIndices: []},
    guessN: 0,
    answeredCorrectly: false
};

export const reducer = (state=initialState, action) => {

    switch(action.type) {
    case actions.START_NEW_GAME:
        return {
            keyNameReadable: action.keyNameReadable,
            keyNameNotation: action.keyNameNotation,
            introChordSequence: action.introChordSequence,
            // accidentals: {
            //     bassAccidental: action.accidentals.bassAccidental,
            //     trebleIndices: [...action.accidentals.trebleIndices]
            // },
            accidentals: action.accidentals,
            chord: action.currentChordNumeral,
            notes: {bass: action.bassNote, treble: action.trebleNotes},
            guessN: 0,
            answeredCorrectly: false
        };

    case actions.GET_NEXT_QUESTION:
        return {
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
            chord: action.currentChordNumeral,
            notes: {bass: action.bassNote, treble: [...action.trebleNotes]},
            accidentals: {
                bassAccidental: action.accidentals.bassAccidental,
                trebleIndices: [...action.accidentals.trebleIndices]
            },
            guessN: 0,
            answeredCorrectly: false
        };

    case actions.INCREMENT_GUESS_N:
        return {
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
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
            answeredCorrectly: false
        };

    case actions.MARK_TURN_CORRECT:
        return {
            keyNameReadable: state.keyNameReadable,
            keyNameNotation: state.keyNameNotation,
            introChordSequence: [[...state.introChordSequence[0]],
                                 [...state.introChordSequence[1]],
                                 [...state.introChordSequence[2]],
                                 [...state.introChordSequence[3]]],
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
            answeredCorrectly: true
        };

    default:
        return state;
    }
};
