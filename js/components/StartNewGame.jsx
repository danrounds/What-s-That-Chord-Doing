import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor() {
        super();
        this.startNewGame = this.startNewGame.bind(this);
    }

    componentDidUpdate() {
        if (this.props.keyValue === 'Control Enter') {
            if (this.props.gameOver || this.props.firstQ || this.prompt()) {
                this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                         this.props.inversions));
                if (this.props.api.authToken) {
                    this.props.dispatch(actions.getMyScores(this.props.api.authToken));
                }
            }
        } else if (this.props.keyValue === 'Enter' && this.props.gameOver) {
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
            if (this.props.api.authToken) {
                this.props.dispatch(actions.getMyScores(this.props.api.authToken));
            }
        }
    }

    prompt() {
        return confirm('Are you sure you discard your progress?');
    }

    startNewGame() {
        if (this.props.gameOver || this.props.firstQ || this.prompt()) {
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
            if (this.props.api.authToken) {
                this.props.dispatch(actions.getMyScores(this.props.api.authToken));
            }
        }
    }

    render() {
        return (
            <button className="ctrl-btn" onClick={this.startNewGame}>
              Start new<br/>game
              {this.props.displayKeyboardShortcuts
                  && <div className="miniKeyHint"><div className="keyHint miniCtrlHint">CTRL</div><div className="miniPlus"> + </div><div className="keyHint miniEnterHint">ENTER</div></div>}
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    displayKeyboardShortcuts: state.ui.displayKeyboardShortcuts,
    api: state.api,
    keyValue: state.game.keyValue,
    gameType: state.game.gameType,
    inversions: state.game.inversions,
    firstQ: state.game.questionNumber === 1 && !state.game.answeredCorrectly,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(StartNewGame);
