require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';

import Soundfont from 'soundfont-player';

import store from './store';

import Game from './components/Game';
import Home from './components/Home';
import LogInOrRegister from './components/LogInOrRegister';
import Scores from './components/Scores';
import WhatIsThis from './components/WhatIsThis';

const ac = new AudioContext();
const instrument = Soundfont.instrument(ac, 'acoustic_grand_piano');

const routes = (
    <Router history={hashHistory}>
      <Route path="/" component={() => <Home instrument={instrument} ac={ac}/>} />
      <Route path="/what-is-this" component={() => <WhatIsThis instrument={instrument} ac={ac}/>} />
      <Route path="scores" component={() => <Scores instrument={instrument} ac={ac}/>} />
      <Route path="log-in-or-register" component={() => <LogInOrRegister instrument={instrument} ac={ac}/>} />
      <Route path="/easy-major" component={() =>
        <Game mode="easyMajor" inversions={false} ac={ac} instrument={instrument}/>} />
      <Route path="/hard-major" component={() =>
        <Game mode="hardMajor" inversions={false} ac={ac} instrument={instrument}/>} />
      <Route path="/easy-minor" component={() =>
        <Game mode="easyMinor" inversions={false} ac={ac}  instrument={instrument}/>} />
      <Route path="/intermediate-minor" component={() =>
        <Game mode="intermediateMinor" inversions={false} ac={ac}  instrument={instrument}/>} />
      <Route path="/hard-minor" component={() =>
        <Game mode="hardMinor" inversions={false} ac={ac} instrument={instrument}/>} />
      <Route path="/all-chords" component={() =>
        <Game mode="all" inversions={false} ac={ac}  instrument={instrument}/>} />
      <Route path="/easy-major-inv" component={() =>
        <Game mode="easyMajor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/hard-major-inv" component={() =>
        <Game mode="hardMajor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/easy-minor-inv" component={() =>
        <Game mode="easyMinor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/intermediate-minor-inv" component={() =>
        <Game mode="intermediateMinor" inversions={true} ac={ac}  instrument={instrument}/>} />
      <Route path="/hard-minor-inv" component={() =>
        <Game mode="hardMinor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/all-chords-inv" component={() =>
        <Game mode="all" inversions={true} ac={ac} instrument={instrument}/>} />
    </Router>
);

document.addEventListener(
    'DOMContentLoaded', () => ReactDOM.render(
        <Provider store={store}>{routes}</Provider>,
        document.getElementById('app')
    )
);
