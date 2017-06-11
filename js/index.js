require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';

import store from './store';
import Game from './components/game';

// document.addEventListener('DOMContentLoaded', () =>
//                           ReactDOM.render(
//                               <Provider store={store}>
//                                 <div>
//                                   <Game />
//                                 </div>
//                               </Provider>,
//                               document.getElementById('app')
//                           ));

const routes = (
    <Router history={hashHistory}>
      <Route path="/easy-major" component={() => <GameWrapper mode="easyMajor"/>} />
      <Route path="/hard-major" component={() => <GameWrapper mode="hardMajor"/>} />
      <Route path="/easy-minor" component={() => <GameWrapper mode="easyMinor"/>} />
      <Route path="/intermediate-minor" component={() => <GameWrapper mode="intmd8Minor"/>} />
      <Route path="/hard-minor" component={() => <GameWrapper mode="hardMinor"/>} />
      <Route path="/all-chords" component={() => <GameWrapper mode="all"/>} />
      <Route path="/easy-major-inv" component={() => <GameWrapper mode="easyMajor" inversions={true}/>} />
      <Route path="/hard-major-inv" component={() => <GameWrapper mode="hardMajor" inversions={true}/>} />
      <Route path="/easy-minor-inv" component={() => <GameWrapper mode="easyMinor" inversions={true}/>} />
      <Route path="/intermediate-minor-inv" component={() => <GameWrapper mode="intmd8Minor" inversions={true}/>} />
      <Route path="/hard-minor-inv" component={() => <GameWrapper mode="hardMinor" inversions={true}/>} />
      <Route path="/all-chords-inv" component={() => <GameWrapper mode="all" inversions={true}/>} />
    </Router>
);

const GameWrapper = (props) => (
    <Provider store={store}>
      <div>
        <Game mode={props.mode} inversion={props.inversions || false}/>
      </div>
    </Provider>
);

document.addEventListener(
    'DOMContentLoaded', () => ReactDOM.render(
        routes, document.getElementById('app')
    )
);
