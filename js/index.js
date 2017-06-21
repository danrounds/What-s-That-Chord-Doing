require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory} from 'react-router';

import Soundfont from 'soundfont-player';

import store from './store';
import GameWrapper from './components/game-wrapper';
import Home from './components/home';

const ac = new AudioContext();
const instrument = Soundfont.instrument(ac, 'acoustic_grand_piano');

const routes = (
    <Router history={hashHistory}>
      <Route path="/" component={() => <Home instrument={instrument} ac={ac}/>} />
      <Route path="/easy-major" component={() =>
        <GameWrapper mode="easyMajor" ac={ac} instrument={instrument}/>} />
      <Route path="/hard-major" component={() =>
        <GameWrapper mode="hardMajor" ac={ac} instrument={instrument}/>} />
      <Route path="/easy-minor" component={() =>
        <GameWrapper mode="easyMinor" ac={ac}  instrument={instrument}/>} />
      <Route path="/intermediate-minor" component={() =>
        <GameWrapper mode="intermediateMinor" ac={ac}  instrument={instrument}/>} />
      <Route path="/hard-minor" component={() =>
        <GameWrapper mode="hardMinor" ac={ac}  instrument={instrument}/>} />
      <Route path="/all-chords" component={() =>
        <GameWrapper mode="all" ac={ac}  instrument={instrument}/>} />
      <Route path="/easy-major-inv" component={() =>
        <GameWrapper mode="easyMajor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/hard-major-inv" component={() =>
        <GameWrapper mode="hardMajor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/easy-minor-inv" component={() =>
        <GameWrapper mode="easyMinor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/intermediate-minor-inv" component={() =>
        <GameWrapper mode="intermediateMinor" inversions={true} ac={ac}  instrument={instrument}/>} />
      <Route path="/hard-minor-inv" component={() =>
        <GameWrapper mode="hardMinor" inversions={true} ac={ac} instrument={instrument}/>} />
      <Route path="/all-chords-inv" component={() =>
        <GameWrapper mode="all" inversions={true} ac={ac} instrument={instrument}/>} />
    </Router>
);

document.addEventListener(
    'DOMContentLoaded', () => ReactDOM.render(
        routes, document.getElementById('app')
    )
);
