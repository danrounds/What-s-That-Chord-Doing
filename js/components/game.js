import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';

import Staves from './staves';
import PlayAudio from './play-audio';
import AnswerEntry from './answer-entry';
import KofN from './k-of-n';
import Next from './next';
import StartNewGame from './start-new-game';
import KeyboardShortcutsOnOff from './keyboard-shortcuts-on-off';
import Status from './status';

import * as actions from '../actions';
import store from '../store';

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
            <div className="game" tabIndex="0" onKeyDown={this.handleKey}
                 onBlur={this.getFocus}
                 ref={element => { this.gameContainer = element; }}>
              <Staves/>
              <Status mode={this.props.mode} inversions={this.props.inversions}/>
              <AnswerEntry />
              <KofN />
              <PlayAudio instrument={this.props.instrument} ac={this.props.ac}/>
              <Next />
              <StartNewGame />
              <MediaQuery minDeviceWidth={800}>
                {(matches) => 
                    (<KeyboardShortcutsOnOff display={matches}/>)
                }
              </MediaQuery>
              <Link to="/">Return to Index</Link>
            </div>
        );
    }
}

export default connect()(Game);
