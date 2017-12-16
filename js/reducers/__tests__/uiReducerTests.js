import uiReducer from '../uiReducer';
import * as actions from '../../actions/uiActions';

describe('gameReducer -- the reducer for our game actions', () => {
    let state;
    beforeEach(() => state = uiReducer(undefined, {}));

    it('should have a consistent initial state', () => {
        expect(state).toMatchSnapshot();
   });

    it('should update the state of our lesson display index', () => {
        state = uiReducer(state, actions.updateLessonIndexDisplay(3));
        expect(state).toMatchSnapshot();
    });

    it('should toggle display of keyboard shortcuts (to true)', () => {
        state = uiReducer(state, actions.toggleKeyboardShortcutDisplay(true));
        expect(state).toMatchSnapshot();
    });
    it('should toggle display of keyboard shortcuts (to false)', () => {
        state = uiReducer(state, actions.toggleKeyboardShortcutDisplay(false));
        expect(state).toMatchSnapshot();
    });
});
