import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        if (this.props.gameOver || this.props.firstQ)
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
        else if (confirm('Are you sure you discard your progress?'))
            this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                     this.props.inversions));
    }

    // componentDidUpdate() {
    //     if (this.props.gameOver && this.props.keyValue === 'Enter')
    //         this.startNewGame();
    //     else if (this.props.keyValue === 'Control Enter') {
    //         if (this.props.gameOver || this.props.firstQ || confirm('Are you sure you discard your progress?'))
    //             this.startNewGame();
    //     }
    // }

    componentDidUpdate() {
        if (this.props.keyValue === 'Enter' || this.props.keyValue === 'Control Enter'){
                this.startNewGame();
        }
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
