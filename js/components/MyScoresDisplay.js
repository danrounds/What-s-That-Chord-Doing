import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import ScoresTable from './ScoresTable';

export class MyScoresDisplay extends React.Component {
    componentDidMount() {
        this.props.dispatch(actions.getMyScores(this.props.api.authToken));
    }

    render() {
        const name = this.props.api.name;
        let hText = name ?
                `Scores for ${this.props.api.name}` : 'Log in for user scores';

        return (
            <div>
              <div className="scores-btn-div">
                <h1 className="scores-h-txt">{hText}</h1>
              </div>
              <ScoresTable tableType="myScores" />
            </div>
        );
    }
}

export default connect((state) => ({ api: state.api }))(MyScoresDisplay);
