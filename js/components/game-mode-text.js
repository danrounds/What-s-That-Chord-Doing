import React from 'react';
import {connect} from 'react-redux';

export class GameModeText extends React.Component {
    constructor(props) {
        super(props);
        this.makeGameModeString = this.makeGameModeString.bind(this);
    }

    makeGameModeString() {
        console.log(this.props.gameInfo);
        if (this.props.gameInfo.inversions) {
            return {
                easyMajor: 'Easy major, with inversions',
                easyMinor: 'Easy minor. with inversions',
                intermediateMinor: 'Intermediate minor, with inversions',
                hardMajor: 'Hard major, with inversions',
                hardMinor: 'Hard minor, with inversions',
                all: 'All our chords, with inversions'}
            [this.props.gameInfo.gameType];
        } else {
            return {
                easyMajor: 'Easy major', easyMinor: 'Easy minor',
                intermediateMinor: 'Intermediate minor',
                hardMajor: 'Hard major',
                hardMinor: 'Hard minor', all: 'All our chords'}
            [this.props.gameInfo.gameType];
        }
    }

    render() {
        return (<div>{this.makeGameModeString()}</div>);
    }
}

const mapStateToProps = (state, props) => ({
    gameInfo: state.gameType
});

export default connect(mapStateToProps)(GameModeText);
