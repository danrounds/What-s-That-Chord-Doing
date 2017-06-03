import React from 'react';
import {connect} from 'react-redux';

import Staves from './staves';
import Audio from './audio';
import AnswerEntry from './answer-entry';
import KofN from './k-of-n';
import Next from './next';
import StartNewGame from './start-new-game';

import * as actions from '../actions';
import store from '../store';

export class Game extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(actions.startNewGame());
    // }

    render() {
        return (
            <div>
              <Staves />
              <AnswerEntry />
              <KofN />
              <Audio />
              <Next />
              <StartNewGame />
            </div>
        );
    }
}

export default connect()(Game);
