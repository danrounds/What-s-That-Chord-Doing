import {combineReducers} from 'redux';

import gameReducer from './gameReducer';
import apiReducer from './apiReducer';

export const reducer = combineReducers({
    game: gameReducer,
    api: apiReducer,
});
