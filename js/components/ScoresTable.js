import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class ScoresTable extends React.Component {

    render() {
        if (this.props.api.pending)
            return <div>'Loading...'</div>;
        else if (!this.props.api.highScores.length)
            return <div>'No relevant scores posted'</div>;
        else if (this.props.api.error)
            return <div>'Error loading scores'</div>;
            
        let entries = [];
        const scoresArray = this.props.api.highScores;

        const mode = this.props.api.lastHighScoreAccessed
                  || this.state.mode + (this.state.inversions ? 'Inv' : '');

        let key = 0;
        for (let i in scoresArray) {
            let name = scoresArray[i].name;
            let { nAnsweredRight, nQuestionNumber, totalClicks, winRatio }
                    = scoresArray[i].scores[mode];

            winRatio = String(winRatio * 100 || '').split('.');
            if (winRatio.length === 2)
                winRatio = [winRatio[0], '.', winRatio[1].substr(0,2)].join('');

            entries.push(
                <tr key={key++}>{[name,nAnsweredRight,nQuestionNumber,totalClicks,winRatio]
                  .map((el) => <th key={key++}>{el}</th>)}
                </tr>
            );
        }
        return (

            <table style={{width: '100%'}}>
              <thead>
                <tr>{['Name','# Right','# Total','Guesses:Right','% Right']
                  .map((el) => <th key={el}>{el}</th>)}
                </tr>
              </thead>
              <tbody>{entries}</tbody>
            </table>

        );
    }
}

const mapStateToProps = (state, props) => ({
    // gameType: state.api.lastHighScoreAccessed || state.game.gameType || 'allChords',
    // inv: state.game.inversions,
    api: state.api || { highScores: [] },
});

export default connect(mapStateToProps)(ScoresTable);
