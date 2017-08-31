import React from 'react';
import {connect} from 'react-redux';

import HighScoresDisplay from './HighScoresDisplay';
import UserScoresDisplay from './UserScoresDisplay';
import NavBar from './NavBar';
import * as actions from '../actions';

export class Scores extends React.Component {
    constructor() {
        super();
        this.state = { showScores: 'highScores' };
        this.setColor = this.setColor.bind(this);
        this.showHighScores = this.showHighScores.bind(this);
        this.showUserScores = this.showUserScores.bind(this);
    }

    setColor(selected) {
        if (selected === this.state.showScores)
            return { backgroundColor: 'pink' };
        return {};
    }

    showHighScores() {
        this.setState({ showScores: 'highScores' });
    }

    showUserScores() {
        this.setState({ showScores: 'userScores' });
    }

    // componentDidMount() {
    //     this.props.dispatch(actions.getHighScores(this.props.gameType));
    //     this.props.dispatch(actions.getUserScores('bobby16', 'abc123'));
    // }

    render() {
        return (
            <div>
              <NavBar parent="Scores"/>

              <button onClick={this.showHighScores} style={this.setColor('highScores')}>
                High Scores
              </button>

              <button onClick={this.showUserScores} style={this.setColor('userScores')}>
                User Scores
              </button>

              {this.state.showScores === 'highScores' ? <HighScoresDisplay /> : null}
              {this.state.showScores === 'userScores' ? <UserScoresDisplay /> : null }

            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(Scores);
