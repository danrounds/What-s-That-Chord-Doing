import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
        this.state = { showKeyboardShortcuts: this.props.displayKeyboardShortcuts };
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
    }

    componentDidUpdate() {
        if (this.props.keyValue === 'Control Enter') {
            if (this.props.gameOver || this.props.firstQ || this.prompt()) {
                this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                         this.props.inversions));
                this.props.dispatch(actions.getMyScores(this.props.api.authToken));
            }
        } else if (this.props.keyValue === 'Enter' && this.props.gameOver) {
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
            this.props.dispatch(actions.getMyScores(this.props.api.authToken));
        } else if (this.state.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts) {
            this.setState({ showKeyboardShortcuts: this.props.displayKeyboardShortcuts });
        }
    }

    prompt() {
        return confirm('Are you sure you discard your progress?');
    }

    startNewGame() {
        if (this.props.gameOver || this.props.firstQ || this.prompt()) {
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
            this.props.dispatch(actions.getMyScores(this.props.api.authToken));
        }
    }

    render() {
        return (
            <button className="ctrlBtns" onClick={this.startNewGame}>
              Start New Game
              {this.props.displayKeyboardShortcuts
                  && <div className="miniKeyHint"><div className="keyHint miniCtrlHint">CTRL</div><div className="miniPlus"> + </div><div className="keyHint miniEnterHint">ENTER</div></div>}
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    api: state.api,
    keyValue: state.game.keyValue,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    gameType: state.game.gameType,
    inversions: state.game.inversions,
    firstQ: state.game.questionNumber === 1 && !state.game.answeredCorrectly,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(StartNewGame);
