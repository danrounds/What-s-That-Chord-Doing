import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class StartNewGame extends React.Component {
    constructor(props) {
        super(props);
        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame() {
        this.props.dispatch(actions.startNewGame());
    }

    render() {
        return (<button onClick={this.startNewGame}><b>Start New Game</b></button>);
    }
}

export default connect()(StartNewGame);
