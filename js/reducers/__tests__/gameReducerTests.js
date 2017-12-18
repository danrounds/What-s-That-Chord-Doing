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
    inversionN: 0,
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
    inversionN: 1,
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

    it('should register key presses', () => {
        state = gameReducer(state, actions.setKeyPress('Enter'));
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

    it('make a guess', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.makeGuess('iii'));
        expect(state).toMatchSnapshot();
    });
    
    it('mark turn correct when the game isn\'t about to be over', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.markTurnCorrect());
        expect(state).toMatchSnapshot();
    });
    it('mark turn correct when the game is about to be over', () => {
        state = gameReducer(state, actions.startNewGame('easyMinor', false));
        state = gameReducer(state, actions.makeGuess('iii'));
        state = gameReducer(Object.assign(state, { questionNumber: 10 }),
                            actions.markTurnCorrect());
        expect(state).toMatchSnapshot();
    });
    

});
