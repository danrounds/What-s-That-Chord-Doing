import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ScoresTable from './ScoresTable';

export class MyScoresDisplay extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getMyScores('bobby4', 'abc123'));
    }

    render() {
        return (
            <div>
              <ScoresTable tableType="myScores" />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    gameType: state.game.gameType || 'allChords',
    api: state.api,
});

export default connect(mapStateToProps)(MyScoresDisplay);