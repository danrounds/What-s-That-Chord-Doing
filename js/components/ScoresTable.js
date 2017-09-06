import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class ScoresTable extends React.Component {
    // This outputs the actual <table>SCORES</table> for our scores--
    // i.e. <table/>, in the HTML sense
    errorCheck() {
        if (this.props.tableType === 'highScore') {
            if (!this.props.api.highScores.length)
                return <div>No relevant scores posted</div>;
        } else if (!Object.keys(this.props.api.myScores).length) {
            return <div>No relevant scores posted</div>;
        }

        if (this.props.api.pending)
            return <div>Loading...</div>;
        else if (this.props.api.error)
            return <div>Error loading scores</div>;

        return false;
    }

    processWinRatio(winRatio) {
        return this.processPercentDisplay(winRatio * 100);
    }

    processPercentDisplay(number=String(number || '').split('.')) {
        number = String(number || '').split('.');
        if (number.length === 2)
            number = [number[0], '.', number[1].substr(0,2)].join('');
        return number;
    }


    processHighScores(key=0) {
        const entries = [];
        const scoresArray = this.props.api.highScores;

        const mode = this.props.api.lastHighScoreAccessed
                  || this.state.mode + (this.state.inversions ? 'Inv' : '');

        for (let i in scoresArray) {
            let name = scoresArray[i].name;
            let { nAnsweredRight, nQuestionNumber, totalClicks, winRatio }
                    = scoresArray[i].scores[mode];

            winRatio = this.processWinRatio(winRatio);
            let clicksPerRight = this.processPercentDisplay(winRatio/totalClicks);

            entries.push(this.rowOutput(name,nAnsweredRight,nQuestionNumber,
                                        clicksPerRight,winRatio,key++));
        }
        return entries;
    }

    processMyScores(key=0) {
        const entries = [];

        // scoreTypes and scoreTexts correspond, [i] to [i]. scoreTypes is used
        // as keys for our api.myScores.scores object; scoreTexts is used as
        // cell values for the `Game Type` column in our scores table:
        const scoreTypes = [
            'easyMajor','easyMajorInv','hardMajor','hardMajorInv','easyMinor',
            'easyMinorInv','intermediateMinor','intermediateMinorInv',
            'hardMinor','hardMinorInv','allChords','allChordsInv'
        ];

        const scoreTexts = [
            'Easy major','Easy major, w/inversions','Hard major',
            'Hard major, w/inversions','Easy minor','Easy minor, w/inversions',
            'Intermediate minor','Intermediate minor, w/inversions','Hard minor',
            'Hard minor, w/inversions','All our chords',
            'All our chords, w/inversions'
        ];

        for (let i in scoreTypes) {
            if (this.props.api.myScores.scores[scoreTypes[i]]) {
                let gameType = scoreTexts[i];
                let { nAnsweredRight, nQuestionNumber, totalClicks, winRatio }
                        = this.props.api.myScores.scores[scoreTypes[i]];

                winRatio = this.processWinRatio(winRatio);
                let clicksPerRight = this.processPercentDisplay(winRatio/totalClicks);

                entries.push(this.rowOutput(gameType, nAnsweredRight,
                                            nQuestionNumber, clicksPerRight,
                                            winRatio, key++));
            }
        }
        return entries;
    }

    rowOutput(nameOrGameType, nAnsweredRight, nQuestionNumber, clicksPerRight, winRatio, key) {
        return (
            <tr key={key++}>
                {[
                    nameOrGameType,
                    nAnsweredRight,
                    nQuestionNumber,
                    clicksPerRight,
                    winRatio
                ].map((el) => <th key={key++}>{el}</th>)}
            </tr>
        );
    }

    render() {
        const error = this.errorCheck();
        if (error)
            return error;

        let columns, entries;
        if (this.props.tableType === 'highScore') {
            entries = this.processHighScores();
            columns = ['Name','?s Right','?s Total','Guesses:Right Answer','% Right'];
        } else{
            entries = this.processMyScores();
            columns = ['Game type','?s Right','?s Total','Guesses:Right Answer','% Right'];
        }

        return (
            <table style={{width: '100%'}}>
              <thead>
                <tr>{columns.map((el) => <th key={el}>{el}</th>)}</tr>
              </thead>
              <tbody>{entries}</tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    api: state.api,
});

export default connect(mapStateToProps)(ScoresTable);
