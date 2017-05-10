import * as actions from '../actions/';
import chordGetter from '../music-logic/';

const initialState = {
    chord: 'i',
    notes: []
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
    case actions.START_NEW_GAME:
        console.log(chordGetter);
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

