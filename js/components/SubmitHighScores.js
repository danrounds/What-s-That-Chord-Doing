import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class SubmitHighScores extends React.Component {
    constructor() {
        super();
        this.state = { submitted: false };
    }

    submitHighScores(props) {
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
        this.props.dispatch(actions.updateMyScores('bobby4','abc123',request));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.gameOver)
            if (!this.state.submitted) {
                this.submitHighScores(nextProps);
                this.setState({ submitted: true });
            }
        else if (nextProps.questionNumber === 1 && this.state.submitted === true)
            this.setState({ submitted: false });
    }

    render() {
        return null;
    }
}


const mapStateToProps = (state, props) => ({
    api: state.api,
    gameType: state.game.gameType,
    inv: state.game.inversions,
    questionNumber: state.game.questionNumber,
    nAnsweredRight: state.game.nAnsweredRight,
    clicksPerRightAnswer: state.game.clicksPerRightAnswer,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(SubmitHighScores);
