import chordGetter from '../music-logic/';

export const START_NEW_GAME = 'START_NEW_GAME';
export const startNewGame = () => {
    let {keyNameReadable, keyNameNotation, introChordSequence} = chordGetter.init('all', true);
    let {currentChordNumeral, bassNote, trebleNotes, accidentals} = chordGetter.getChord();;
    return {
        type: START_NEW_GAME,
        keyNameReadable,
        keyNameNotation,
        introChordSequence,
        currentChordNumeral,
        bassNote,
        trebleNotes,
        accidentals
    };
};

export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const getNextQuestion = () => {
    let {currentChordNumeral, bassNote, trebleNotes, accidentals} = chordGetter.getChord();
    return {
        type: GET_NEXT_QUESTION,
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
