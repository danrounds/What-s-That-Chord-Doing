export const UPDATE_LESSON_INDEX_DISPLAY = 'UPDATE_LESSON_INDEX_DISPLAY';
export const updateLessonIndexDisplay = (keyValueToUpdate) => ({
    type: UPDATE_LESSON_INDEX_DISPLAY,
    keyValueToUpdate,
});

export const TOGGLE_KEYBOARD_SHORTCUT_DISPLAY = 'TOGGLE_KEYBOARD_SHORTCUT_DISPLAY';
export const toggleKeyboardShortcutDisplay = (displayBool) => {
    localStorage.setItem('@WTCD/displayKeyboardShortcuts', displayBool);
    return {
        type: TOGGLE_KEYBOARD_SHORTCUT_DISPLAY,
        displayBool,
    };
};
