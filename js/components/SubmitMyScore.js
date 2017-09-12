import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class SubmitMyScore extends React.Component {
    // Our method of updating high scores at the server involves taking the
    // .api data we retrieved when we started our game and augmenting it with
    // the data we generated during the game.
    //
    // This is non-robust, in the sense that if (for some reason) we had two
    // games going on different computers/in different browsers, we could
    // generate conflicting data

    constructor() {
        super();
        this.state = { submitted: false };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameOver)
            if (!this.state.submitted) {
                this.submitMyScore(nextProps);
                this.setState({ submitted: true });
            }
        else if (nextProps.questionNumber === 1 && this.state.submitted === true)
            this.setState({ submitted: false });
    }

    submitMyScore(props) {
        const gameMode = props.gameType + (props.inv ? 'Inv' : '');

        const scoresObj = props.api.myScores.scores;
        totalClicks = nAnsweredRight = nQuestionNumber = 0;
        if (scoresObj)
            if (scoresObj[gameMode])
                var { totalClicks, nAnsweredRight, nQuestionNumber }
                        = scoresObj[gameMode];
        // function-level variable necessary, here

        totalClicks += props.clicksPerRightAnswer.reduce((a,b) => a + b);
        nAnsweredRight += props.nAnsweredRight;
        nQuestionNumber += 10;

        const scores = {};
        scores[gameMode] = {
            totalClicks,
            nAnsweredRight,
            nQuestionNumber,
        };

        const request = { name: props.api.myScores.name, scores };
        this.props.dispatch(
            actions.updateMyScores(this.props.api.authToken, request));
    }

    render() {
        // This is a non-display component; it only exists for the "logic,"
        // associated with it
        return null;
    }
}


const mapStateToProps = (state) => ({
    api: state.api,
    gameType: state.game.gameType,
    inv: state.game.inversions,
    questionNumber: state.game.questionNumber,
    nAnsweredRight: state.game.nAnsweredRight,
    clicksPerRightAnswer: state.game.clicksPerRightAnswer,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(SubmitMyScore);
