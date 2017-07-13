import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';

import NavBar from './nav-bar';
import GameModeText from './game-mode-text';
import KofN from './k-of-n';
import Staves from './staves';
import Status from './status';
import AnswerEntry from './answer-entry';
import PlayAudio from './play-audio';
import StartNewGame from './start-new-game';
import Next from './next';

import * as actions from '../actions';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
        this.getFocus = this.getFocus.bind(this);
        this.props.dispatch(actions.startNewGame(this.props.mode,
                                                 this.props.inversions));
    }

    getFocus() {
        this.gameContainer.focus();
    };

    handleKey(e) {
        this.props.dispatch(actions.getKeyPress(e.ctrlKey ?
                                                'Control '+e.key : e.key));
    };

    componentDidMount() {
        this.getFocus();
    }

    componentDidUpdate() {
        this.getFocus();
    }

    render() {
        return (
            <div tabIndex="0" onKeyDown={this.handleKey}
                 onBlur={this.getFocus}
                 ref={element => { this.gameContainer = element; }}>
              <NavBar />
              <div className="game">
                <GameModeText />
                <KofN />
                <Staves />
                <Status mode={this.props.mode} inversions={this.props.inversions}/>
                <AnswerEntry />
                <PlayAudio instrument={this.props.instrument} ac={this.props.ac}/>
                <StartNewGame />
                <Next />
              </div>
            </div>
        );
    }
}

export default connect()(Game);
