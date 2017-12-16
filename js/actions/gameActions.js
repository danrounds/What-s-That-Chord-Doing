import chordGetter from '../musicLogic/';

export const UPDATE_LESSON_INDEX_DISPLAY = 'UPDATE_LESSON_INDEX_DISPLAY';
export const updateLessonIndexDisplay = (keyValueToUpdate) => ({
    type: UPDATE_LESSON_INDEX_DISPLAY,
    keyValueToUpdate,
});

export const GET_KEY_PRESS = 'GET_KEY_PRESS';
export const getKeyPress = (keyValue) => ({
    type: GET_KEY_PRESS,
    keyValue,
});

export const TOGGLE_KEYBOARD_SHORTCUT_DISPLAY = 'TOGGLE_KEYBOARD_SHORTCUT_DISPLAY';
export const toggleKeyboardShortcutDisplay = (displayBool) => ({
    type: TOGGLE_KEYBOARD_SHORTCUT_DISPLAY,
    displayBool,
});

export const START_NEW_GAME = 'START_NEW_GAME';
export const startNewGame = (gameType, inversions) => {
    let {keyNameReadable, keyNameNotation, introChordSequence, chordSubset} =
            chordGetter.init(gameType, inversions);
    let {chordName, currentChordNumeral, bassNote, trebleNotes, accidentals} =
            chordGetter.getChord();
    let gameNumber = Math.random() * Math.pow(2,52);
    // ^ This is not a seed number; it's merely an [ostensibly] unique
    // identifier, that we'll use to decide whether components should update

    return {
        type: START_NEW_GAME,
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
        accidentals
    };
};
export const GIVE_UP = 'GIVE_UP';
export const giveUp = () => ({
    type: GIVE_UP,
});

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
        accidentals,
    };
};

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = (guess) => ({
    type: MAKE_GUESS,
    guess,
});

export const MARK_TURN_CORRECT = 'MARK_TURN_CORRECT';
export const markTurnCorrect = () => ({
    type: MARK_TURN_CORRECT,
});
