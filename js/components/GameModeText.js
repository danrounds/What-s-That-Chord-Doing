import React from 'react';
import {connect} from 'react-redux';

export class GameModeText extends React.Component {
    makeGameModeString() {
        if (this.props.inversions) {
            return {
                easyMajor: 'Easy major, with inversions',
                easyMinor: 'Easy minor. with inversions',
                intermediateMinor: 'Intermediate minor, with inversions',
                hardMajor: 'Hard major, with inversions',
                hardMinor: 'Hard minor, with inversions',
                allChords: 'All our chords, with inversions'}
            [this.props.gameType];
        } else {
            return {
                easyMajor: 'Easy major', easyMinor: 'Easy minor',
                intermediateMinor: 'Intermediate minor',
                hardMajor: 'Hard major',
                hardMinor: 'Hard minor', allChords: 'All our chords'}
            [this.props.gameType];
        }
    }

    render() {
        return (<div className="game-mode-string">{this.makeGameModeString()}</div>);
    }
}

const mapStateToProps = (state) => ({
    gameType: state.game.gameType,
    inversions: state.game.inversions
});

export default connect(mapStateToProps)(GameModeText);
