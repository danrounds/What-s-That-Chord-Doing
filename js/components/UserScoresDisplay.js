import React from 'react';
import {connect} from 'react-redux';

export class UserScoresDisplay extends React.Component {
    render() {
        return <div>HERE ARE SOME user SCORES 2</div>;
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(UserScoresDisplay);
