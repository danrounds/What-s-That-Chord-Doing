import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
        this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
    }

    prompt() {
        return confirm('Are you sure you discard your progress?');
    }

    startNewGame() {
        if (this.props.gameOver || this.props.firstQ || this.prompt())
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
    }

    componentDidUpdate() {
        if (this.props.keyValue === 'Control Enter') {
            if (this.props.gameOver || this.props.firstQ || this.prompt())
                this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));

        } else if (this.props.keyValue === 'Enter' && this.props.gameOver) {
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
        } else if (this.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts) {
            this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
            this.forceUpdate();
        }
    }

    render() {
        return (
            <button className="ctrlBtns" onClick={this.startNewGame}>
              Start New Game
              {this.props.displayKeyboardShortcuts
                  ? <div className="miniKeyHint"><div className="keyHint miniCtrlHint">CTRL</div><div className="miniPlus"> + </div><div className="keyHint miniEnterHint">ENTER</div></div>
              : null}
            </button>
        );
    }

    // render() {
    //     return (
    //         <button className="ctrlBtns" onClick={this.startNewGame}>
    //           Start New Game
    //           {this.props.displayKeyboardShortcuts
    //               ? <div className="miniKeyHint keyHint">CTRL ENTER</div>
    //           : null}
    //         </button>
    //     );
    // }

}

const mapStateToProps = (state, props) => ({
    keyValue: state.keyValue,
    displayKeyboardShortcuts: state.displayKeyboardShortcuts,
    gameType: state.gameType,
    inversions: state.inversions,
    firstQ: state.questionNumber === 1 && !state.answeredCorrectly,
    gameOver: state.gameOver
});

export default connect(mapStateToProps)(StartNewGame);
