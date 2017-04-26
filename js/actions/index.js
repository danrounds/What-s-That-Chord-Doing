
export const START_NEW_GAME = 'START_NEW_GAME';
export const startNewGame = () => ({
    type: START_NEW_GAME
});

export const GET_NEW_CHORD = 'GET_NEW_CHORD';
export const getNewChord = () => ({
    type: GET_NEW_CHORD
});

export const COMPARE_TO_ACTUAL = 'COMPARE_TO_ACTUAL';
export const compareToActual = (guess) => ({
    type: compareToActual,
    guess
});
