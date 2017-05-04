import * as actions from '../actions/';

const initialState = {
    chord: 'i',
    notes: []
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
    case actions.START_NEW_GAME:
        return {
            chord: 'i',
            notes: ['C3', 'C4', 'E4', 'G4']
        };

    case actions.COMPARE_TO_ACTUAL:
        console.log(action.guess);
        return {
            chord: 'whe',
            notes: ['E3', 'C4', 'E4', 'G4']
        };

    case actions.GET_NEXT_QUESTION:
        console.log('yup');
        return {
            chord: 'whe',
            notes: ['G3', 'C4', 'E3', 'G3']
        };

    default:
        console.log('we here');
        return state;
    }


};

const bassChromSharps = ['A/2', 'A#/2', 'B/2', 'C/3', 'C#/3', 'D/3', 'D#/3', 'E/3', 'F/3', 'F#/3', 'G/3', 'G#/3'];
const bassChromFlats =  ['A/2', 'Bb/2', 'B/2', 'C/3', 'Db/3', 'D/3', 'Eb/3', 'E/3', 'F/3', 'Gb/3', 'G/3', 'G#/3'];

trebleChromatic: {'A3'}

// [I, ii, iii, VI, V, vi, vii°]

// const a_dim;

// const a_min = {
//     bass: {'A/1', 'A/2'},
//     treble: {'A/3', 'C/4', 'E/4'}
// };

// const a_maj;
// const a_aug;




// const c_maj = {
//     bass: ['C/2', 'C/3'],
//     treble: ['C/4', 'E/4', 'G/4']
// };


// 'C/4'.split('/').join('')
