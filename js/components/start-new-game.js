import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        this.props.dispatch(actions.startNewGame(this.props.gameType,
                                                 this.props.inversions));
    }

    render() {
        return (<button onClick={this.startNewGame}><b>Start New Game</b></button>);
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.gameType,
    inversions: state.inversions
});

export default connect(mapStateToProps)(StartNewGame);
