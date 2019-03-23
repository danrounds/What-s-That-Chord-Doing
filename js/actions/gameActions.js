import * as types from './gameActionTypes.js';
import chordGetter from '../musicLogic/';

export const setKeyPress = (keyValue) => ({
    type: types.SET_KEY_PRESS,
    keyValue,
});

export const startNewGame = (gameType, inversions) => {
    let { keyNameReadable, keyNameNotation, introChordSequence, chordSubset } =
            chordGetter.init(gameType, inversions);
    let { chordName, currentChordNumeral, bassNote, trebleNotes, inversion, accidentals } =
            chordGetter.getChord();
    let gameNumber = Math.random() * Math.pow(2,52);
    // ^ This is not a seed number; it's merely an [ostensibly] unique
    // identifier, that we'll use to decide whether components should update

    return {
        type: types.START_NEW_GAME,
        gameType,
        gameNumber,
        inversions,
        keyNameReadable,
        keyNameNotation,
        introChordSequence,
        chordSubset,
        chordName,
        currentChordNumeral,
        bassNote,
        trebleNotes,
        inversionN: inversion,
        accidentals
    };
};
export const giveUp = () => ({
    type: types.GIVE_UP,
});

export const getNextQuestion = () => {
    let { chordName, currentChordNumeral, bassNote, trebleNotes, inversion, accidentals } =
            chordGetter.getChord();
    return {
        type: types.GET_NEXT_QUESTION,
        chordName,
        currentChordNumeral,
        bassNote,
        trebleNotes,
        inversionN: inversion,
        accidentals,
    };
};

export const makeGuess = (guess) => ({
    type: types.MAKE_GUESS,
    guess,
});

export const markTurnCorrect = () => ({
    type: types.MARK_TURN_CORRECT,
});
