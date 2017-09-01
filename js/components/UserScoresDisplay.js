import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ScoresTable from './ScoresTable';

export class UserScoresDisplay extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getUserScores('bobby4', 'abc123'));
    }

    render() {
        return (
            <div>
              <ScoresTable tableType="userScores" />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(UserScoresDisplay);
