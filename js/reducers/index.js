import * as actions from '../actions/';

const initialState = {
    chord: 'i'
};

export const reducer = (state=initialState, action) => {
    switch(action.type) {
    case actions.COMPARE_TO_ACTUAL:
        console.log(action.guess);
        break;

    default:
        console.log('we here');
    }


};
