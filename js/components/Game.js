import React from 'react';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';

import NavBar from './NavBar';
import GameModeText from './GameModeText';
import KofN from './KofN';
import Staves from './Staves';
import Status from './Status';
import AnswerEntry from './AnswerEntry';
import PlayAudio from './PlayAudio';
import StartNewGame from './StartNewGame';
import Next from './Next';
import SubmitHighScores from './SubmitHighScores';

import * as actions from '../actions';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
        this.getFocus = this.getFocus.bind(this);

        this.props.dispatch(actions.startNewGame(this.props.mode,
                                                 this.props.inversions));
        this.props.dispatch(actions.getMyScores('bobby4', 'abc123'));
    }

    componentDidMount() {
        this.getFocus();
    }

    componentDidUpdate() {
        this.getFocus();
    }

    getFocus() {
        this.gameContainer.focus();
    };

    handleKey(e) {
        this.props.dispatch(actions.getKeyPress(e.ctrlKey ?
                                                'Control '+e.key : e.key));
    };

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
                <Status mode={this.props.mode} inversions={this.props.inversions} />
                <AnswerEntry />
                <PlayAudio instrument={this.props.instrument} ac={this.props.ac} />
                <StartNewGame />
                <Next />
                <SubmitHighScores />
              </div>
            </div>
        );
    }
}

export default connect()(Game);
