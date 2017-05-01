import * as actions from '../actions/';

const initialState = {
    chord: 'i',
    notes: ['D2', 'D3', 'D4', 'E4', 'G4', 'B7', 'D5']
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
    case actions.COMPARE_TO_ACTUAL:
        console.log(action.guess);
        return {
            chord: 'whe',
            notes: ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3']
        };

    default:
        console.log('we here');
        return state;
    }


};

// [I, ii, iii, VI, V, vi, vii°]
