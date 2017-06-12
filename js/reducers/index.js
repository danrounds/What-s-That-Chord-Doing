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
    answeredCorrectly: null
};

export const reducer = (state=initialState, action) => {

    switch(action.type) {
    case actions.START_NEW_GAME:
        return {
            gameType: action.gameType,
            inversions: action.inversions,
            keyNameReadable: action.keyNameReadable,
            keyNameNotation: action.keyNameNotation,
            introChordSequence: action.introChordSequence,
            chordSubset: action.chordSubset,
            accidentals: action.accidentals,
            chordName: action.chordName,
            chord: action.currentChordNumeral,
            notes: {bass: action.bassNote, treble: action.trebleNotes},
            guessN: 0,
            answeredCorrectly: false
        };

    case actions.GET_NEXT_QUESTION:
        return {
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
            answeredCorrectly: false
        };

    case actions.INCREMENT_GUESS_N:
        return {
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
            answeredCorrectly: false
        };

    case actions.MARK_TURN_CORRECT:
        return {
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
            answeredCorrectly: true
        };

    default:
        return state;
    }
};
