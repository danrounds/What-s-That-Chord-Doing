import React from 'react';
import {connect} from 'react-redux';

import HighScoresDisplay from './HighScoresDisplay';
import MyScoresDisplay from './MyScoresDisplay';
import NavBar from './NavBar';
import * as actions from '../actions';

export class Scores extends React.Component {
    constructor() {
        super();
        this.state = { showScores: 'highScores' };
        this.setColor = this.setColor.bind(this);
        this.showHighScores = this.showHighScores.bind(this);
        this.showMyScores = this.showMyScores.bind(this);
    }

    setColor(selected) {
        if (selected === this.state.showScores)
            return { backgroundColor: 'pink' };
        return {};
    }

    showHighScores() {
        this.setState({ showScores: 'highScores' });
    }

    showMyScores() {
        this.setState({ showScores: 'myScores' });
    }

    componentDidMount() {
        this.props.instrument.then(piano => piano.stop());
    }

    render() {
        return (
            <div>
              <NavBar parent="Scores"/>

              <button onClick={this.showHighScores} style={this.setColor('highScores')}>
                High Scores
              </button>

              <button onClick={this.showMyScores} style={this.setColor('myScores')}>
                My Scores
              </button>

              {this.state.showScores === 'highScores' ? <HighScoresDisplay /> : null}
              {this.state.showScores === 'myScores' ? <MyScoresDisplay /> : null }

            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(Scores);
