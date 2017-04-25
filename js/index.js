require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';

import Game from './components/game';

document.addEventListener('DOMContentLoaded', () =>
                          ReactDOM.render(
                              <div>
                                <Game />
                              </div>,
                              document.getElementById('app')
                          ));
