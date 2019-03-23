import * as types from './uiActionTypes.js';

export const updateLessonIndexDisplay = (keyValueToUpdate) => ({
    type: types.UPDATE_LESSON_INDEX_DISPLAY,
    keyValueToUpdate,
});

export const toggleKeyboardShortcutDisplay = (displayBool) => {
    localStorage.setItem('@WTCD/displayKeyboardShortcuts', displayBool);
    return {
        type: types.TOGGLE_KEYBOARD_SHORTCUT_DISPLAY,
        displayBool,
    };
};
