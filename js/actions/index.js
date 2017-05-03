
export const START_NEW_GAME = 'START_NEW_GAME';
export const startNewGame = () => ({
    type: START_NEW_GAME
});

export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION';
export const getNextQuestion = () => ({
    type: GET_NEXT_QUESTION
});

export const COMPARE_TO_ACTUAL = 'COMPARE_TO_ACTUAL';
export const compareToActual = (guess) => ({
    type: COMPARE_TO_ACTUAL,
    guess
});
