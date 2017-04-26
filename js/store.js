import {createStore, applyMiddleware} from 'redux';

import * as reducers from './reducers';

export default createStore(reducers.reducer);
