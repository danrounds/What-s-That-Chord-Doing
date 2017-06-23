import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
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

        } else if (this.props.keyValue === 'Enter' && this.props.gameOver)
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));

    }

    render() {
        return (<button onClick={this.startNewGame}><b>Start New Game</b></button>);
    }
}

const mapStateToProps = (state, props) => ({
    keyValue: state.keyValue,
    gameType: state.gameType,
    inversions: state.inversions,
    firstQ: state.questionNumber === 1 && !state.answeredCorrectly,
    gameOver: state.gameOver
});

export default connect(mapStateToProps)(StartNewGame);
