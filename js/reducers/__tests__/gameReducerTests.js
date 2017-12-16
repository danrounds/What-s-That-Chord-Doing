import gameReducer from '../gameReducer';
import * as actions from '../../actions/gameActions';

actions.startNewGame = (gameType, inversions) => ({
    type: 'START_NEW_GAME',
    gameType,
    gameNumber: 392549214,
    inversions,
    keyNameReadable: 'Ab minor',
    keyNameNotation: 'Abm',
    introChordSequence: [
        ['G#/3','D#/5','G#/5','B/5',],
        ['C#/4','C#/5','E/5','G#/5',],
        ['D#/4','A#/4','D#/5','G/5',],
        ['G#/3','B/4','D#/5','G#/5',]
    ],
    chordSubset: [
        'i','♭II','ii°','ii','♭III','iv','v','V','♭VI','vi','♭VII','vii°',
    ],
    chordName: 'G diminished',
    currentChordNumeral: 'vii°',
    bassNote: 'G/4',
    trebleNotes: ['G/5','Bb/5','Db/6',],
    accidentals: {
        bassAccidental: true,
        trebleIndices: [0]
    },
});

actions.getNextQuestion = () => ({
    type: 'GET_NEXT_QUESTION',
    chordName: 'Cb major',
    currentChordNumeral:'♭III',
    bassNote: 'Cb/4',
    trebleNotes: ['Cb/5','Eb/5','Gb/5',],
    accidentals: {
        bassAccidental: false,
        trebleIndices: [],
    },
});

describe('gameReducer -- the reducer for our game actions', () => {
    let state;
    beforeEach(() => state = gameReducer(undefined, {}));

    it('should have a consistent initial state', () => {
        expect(state).toMatchSnapshot();
    });

    it('should update the state of our lesson display index', () => {
        state = gameReducer(state, actions.updateLessonIndexDisplay(3));
        expect(state).toMatchSnapshot();
    });

    it('should register key presses', () => {
        state = gameReducer(state, actions.getKeyPress('Enter'));
        expect(state).toMatchSnapshot();
    });

    it('should toggle display of keyboard shortcuts (to true)', () => {
        state = gameReducer(state, actions.toggleKeyboardShortcutDisplay(true));
        expect(state).toMatchSnapshot();
    });
    it('should toggle display of keyboard shortcuts (to false)', () => {
        state = gameReducer(state, actions.toggleKeyboardShortcutDisplay(false));
        expect(state).toMatchSnapshot();
    });

    it('should start a new game', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        expect(state).toMatchSnapshot();
    });

    it('should let us give up, when we don\'t know the answer', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.giveUp());
        expect(state).toMatchSnapshot();
    });

    it('get the next question', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.getNextQuestion());
        expect(state).toMatchSnapshot();
    });

    it('increment the guess number', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.incrementGuessN());
        expect(state).toMatchSnapshot();
    });
    
    it('mark turn correct when the game isn\'t about to over', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.markTurnCorrect());
        expect(state).toMatchSnapshot();
    });
    it('mark turn correct when the game is about to be over', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(Object.assign(state, { questionNumber: 10 }),
                            actions.markTurnCorrect());
        expect(state).toMatchSnapshot();
    });
    

});
