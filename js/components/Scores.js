import React from 'react';
import {connect} from 'react-redux';

import HighScoresDisplay from './HighScoresDisplay';
import MyScoresDisplay from './MyScoresDisplay';
import NavBar from './NavBar';
import * as actions from '../actions';

export class Scores extends React.Component {
    // This is the component associated with our /scores endpoint--i.e.,
    // the component that displays when we click "Scores," on our NavBar
    constructor() {
        super();
        this.state = { showScores: 'highScores' };
        this.getStyle = this.getStyle.bind(this);
        this.showHighScores = this.showHighScores.bind(this);
        this.showMyScores = this.showMyScores.bind(this);
    }

    getStyle(selected) {
        return selected === this.state.showScores ? 'huge-btn huge-btn-active' : 'huge-btn';
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

              <div className="huge-btn-div">
                <button onClick={this.showHighScores} className={this.getStyle('highScores')}>
                  High Scores
                </button>

                <button onClick={this.showMyScores} className={this.getStyle('myScores')}>
                  My Scores
                </button>
              </div>

              {this.state.showScores === 'highScores' && <HighScoresDisplay />}
              {this.state.showScores === 'myScores' && <MyScoresDisplay />}

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(Scores);
