require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import Game from './components/game';

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(
                              <Provider store={store}>
                                <div>
                                  <Game />
                                </div>
                              </Provider>,
                              document.getElementById('app')
                          ));
