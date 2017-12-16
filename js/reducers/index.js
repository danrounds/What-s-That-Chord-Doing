import { combineReducers } from 'redux';

import uiReducer from './uiReducer';
import gameReducer from './gameReducer';
import apiReducer from './apiReducer';

export const reducer = combineReducers({
    ui: uiReducer,
    game: gameReducer,
    api: apiReducer,
});
