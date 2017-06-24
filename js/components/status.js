import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class Status extends React.Component {
    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getStatusText() {
        if (!this.props.answeredCorrectly && this.props.guessN) {
            this.statusText =  this.getRandom(
                [
                    'Not right','That\'s not it','Wrong','Incorrect','No',
                    'You are wrong','Nope'
                ]);

        } else if (this.props.answeredCorrectly && !this.stopPrompting) {
            this.statusText =  this.getRandom(['You got it!','Yes!','Correct!']) +
                ` The ${this.props.chord} chord of ${this.props.key_} is` +
                ` ${this.props.chordName}`;

            this.stopPrompting = true;

        } else if (!(this.stopPrompting && this.props.guessN)) {
            this.statusText = '';
            this.stopPrompting = false;
        }

        return this.statusText;
    }

    getAverageClicks() {
        return (this.props.clicksPerRightAnswer.length) ?
            String(
                this.props.clicksPerRightAnswer.reduce(
                    (a,b) => a + b)/this.props.clicksPerRightAnswer.length
            ).substring(0,5) + ' guesses per correct answer'
            : '';
    }

    getNewGameLink() {
        if (this.props.gameOver)
            return (
                <div>
                  Press ENTER to <a href="javascript:void(0)"
                                    onClick={() => this.props.dispatch(
                    actions.startNewGame(this.props.mode,this.props.inversions))}>
                    play again
                  </a>
                </div>);
        else if (this.props.answeredCorrectly)
            return (<div>Press SPACE for the next question</div>);
        else
            return null;
    }

    render() {
        return (
            <h3>
              {this.getNewGameLink()}<br/>
              {this.getStatusText()}<br/>
              {this.nRightText = this.props.nAnsweredRight +' answered correctly'}<br/>
              {this.getAverageClicks()}
            </h3>
        );
    }

}

const mapStateToProps = (state, props) => ({
    keyValue: state.keyValue,
    key_: state.keyNameReadable,
    chordName: state.chordName,
    chord: state.chord,
    guessN: state.guessN,
    answeredCorrectly: state.answeredCorrectly,
    nAnsweredRight: state.nAnsweredRight,
    clicksPerRightAnswer: state.clicksPerRightAnswer,
    gameOver: state.gameOver
});

export default connect(mapStateToProps)(Status);
