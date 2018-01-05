import * as actions from '../actions/uiActions';

const initialState = {
    lessonIndexDisplay: { easy: false, novice: false, difficult: false, i: 0 },
    displayKeyboardShortcuts: JSON.parse(localStorage.getItem('@WTCD/displayKeyboardShortcuts')),
};

// Reducer for the lesson-index and keyboard shortcut display
export default (state=initialState, action) => {

    switch(action.type) {

    case actions.UPDATE_LESSON_INDEX_DISPLAY:
        return {
            lessonIndexDisplay: Object.assign({}, state.lessonIndexDisplay, action.keyValueToUpdate),
            displayKeyboardShortcuts: state.displayKeyboardShortcuts,
        };

    case actions.TOGGLE_KEYBOARD_SHORTCUT_DISPLAY:
        return {
            lessonIndexDisplay: Object.assign({}, state.lessonIndexDisplay),
            displayKeyboardShortcuts: action.displayBool,
        };

    default:
        return state;
    }
};

