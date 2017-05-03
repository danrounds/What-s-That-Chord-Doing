import * as actions from '../actions/';

const initialState = {
    chord: 'i',
    notes: []
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
    case actions.COMPARE_TO_ACTUAL:
        console.log(action.guess);
        return {
            chord: 'whe',
            notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
        };

    default:
        console.log('we here');
        return state;
    }


};

// [I, ii, iii, VI, V, vi, vii°]
