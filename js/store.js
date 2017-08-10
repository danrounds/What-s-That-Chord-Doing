import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

export default createStore(reducers.reducer, applyMiddleware(thunk));
