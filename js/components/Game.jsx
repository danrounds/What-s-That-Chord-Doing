import React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import NavBar from './NavBar';
import GameModeText from './GameModeText';
import KofN from './KofN';
import Staves from './Staves';
import Status from './Status';
import AnswerEntry from './AnswerEntry';
import PlayAudio from './PlayAudio';
import StartNewGame from './StartNewGame';
import GiveUpOrNext from './GiveUpOrNext';
import SubmitMyScore from './SubmitMyScore';

import * as actions from '../actions';

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleKey = this.handleKey.bind(this);
        this.getFocus = this.getFocus.bind(this);

        const mode = this.props.mode, inv = this.props.inversions;
        this.props.dispatch(actions.startNewGame(mode, inv));
        this.props.dispatch(actions.getHighScores(mode + (inv ? 'Inv' : '')));
        if (this.props.api.authToken)
            this.props.dispatch(actions.getMyScores(this.props.api.authToken));
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
        this.props.dispatch(actions.setKeyPress(e.ctrlKey ?
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
                <GiveUpOrNext />
                <SubmitMyScore />
              </div>
            </div>
        );
    }
}

export default connect((state) => ({ api: state.api }))(Game);
