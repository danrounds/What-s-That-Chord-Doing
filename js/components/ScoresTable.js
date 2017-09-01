import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class ScoresTable extends React.Component {
    errorCheck() {
        if (this.props.tableType === 'highScore') {
            if (!this.props.api.highScores.length)
                return <div>No relevant scores posted</div>;
        } else if (!Object.keys(this.props.api.userScores).length) {
            return <div>No relevant scores posted</div>;
        }

        if (this.props.api.pending)
            return <div>Loading...</div>;
        else if (this.props.api.error)
            return <div>Error loading scores</div>;

        return false;
    }

    processWinRatio(winRatio) {
        winRatio = String(winRatio * 100 || '').split('.');
        if (winRatio.length === 2)
            winRatio = [winRatio[0], '.', winRatio[1].substr(0,2)].join('');
        return winRatio;
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
            entries.push(this.rowOutput(name,nAnsweredRight,nQuestionNumber,
                                        totalClicks,winRatio,key++));
        }
        return entries;
    }

    processUserScores(key=0) {
        // These two arrays correspond, [i] for [i]
        const entries = [];
        const scoreTypes =  ['easyMajor','easyMajorInv','hardMajor','hardMajorInv','easyMinor','easyMinorInv',
         'intermediateMinor','intermediateMinorInv','hardMinor','hardMinorInv','allChords',
         'allChordsInv'];

        const scoreTexts = ['Easy major',
         'Easy major, w/inversions',
         'Hard major',
         'Hard major, w/inversions',
         'Easy minor',
         'Easy minor, w/inversions',
         'Intermediate minor',
         'Intermediate minor, w/inversions',
         'Hard minor',
         'Hard minor, w/inversions',
         'All our chords',
         'All our chords, w/inversions'];

        for (let i in scoreTypes) {
            if (this.props.api.userScores.scores[scoreTypes[i]]) {
                let gameType = scoreTexts[i];
                let { nAnsweredRight, nQuestionNumber, totalClicks, winRatio }
                        = this.props.api.userScores.scores[scoreTypes[i]];
                winRatio = this.processWinRatio(winRatio);

                entries.push(this.rowOutput(gameType,nAnsweredRight,nQuestionNumber,totalClicks,
                                   winRatio,key++));

                console.log(this.props.api.userScores.scores[scoreTypes[i]]);
            }
        }
        return entries;
    }

    rowOutput(nameOrGameType, nAnsweredRight, nQuestionNumber, totalClicks, winRatio, key) {
        return (
            <tr key={key++}>
              {[nameOrGameType,nAnsweredRight,nQuestionNumber,totalClicks,winRatio]
              .map((el) => <th key={key++}>{el}</th>)}
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
            columns = ['Name','# Right','# Total','Guesses:Right','% Right'];
        } else{
            entries = this.processUserScores();
            columns = ['Game type','# Right','# Total','Guesses:Right','% Right'];
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

const mapStateToProps = (state, props) => ({
    api: state.api,
});

export default connect(mapStateToProps)(ScoresTable);
