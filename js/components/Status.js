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
            this.statusText = (<br/>);
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
            : (<br/>);
    }

    getBetweenTurnStatus() {
        if (this.props.gameOver) {
            if (this.props.displayKeyboardShortcuts)
                return (
                    <div>
                      Game over! Press&nbsp;
                      <span className="keyHint">ENTER</span> to&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={() => {
                             this.props.dispatch(
                                 actions.startNewGame(this.props.mode,this.props.inversions));
                             this.props.dispatch(actions.getMyScores(this.props.api.authToken));
                        }}>
                        play again
                      </a>
                    </div>);
            else
                return (
                    <div>Game over!&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={
                             () => {this.props.dispatch(actions.startNewGame(this.props.mode,this.props.inversions));
                                    this.props.dispatch(actions.getMyScores(this.props.api.authToken));
                        }}>
                        Play again?
                    </a></div>);
        } else if (this.props.answeredCorrectly) {
            if (this.props.displayKeyboardShortcuts)
                return (
                    <div>
                      Press <span className="keyHint">SPACE</span> for&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={() => this.props.dispatch(
                        actions.getNextQuestion())}>the next question
                      </a>
                    </div>);
            else
                return (
                    <a className="game-link" href="javascript:void(0)"
                       onClick={() => this.props.dispatch(
                      actions.getNextQuestion())}>Want the next question?
                    </a>
                );
        } else if (!this.props.guessN) {
            return (<div>Guess the chord based on context!</div>);
        } else {
            return (<br/>);
        }
    }

    render() {
        return (
            <div className="status-box">
              <h3 className="status-feedback">{this.getStatusText()}</h3>
              <h3 className="status-secondary">{this.nRightText = this.props.nAnsweredRight +' answered correctly'}</h3>
              <h3 className="status-secondary">{this.getAverageClicks()}</h3>
              <h2 className="status-primary">{this.getBetweenTurnStatus()}</h2>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    api: state.api,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    key_: state.game.keyNameReadable,
    chordName: state.game.chordName,
    chord: state.game.chord,
    guessN: state.game.guessN,
    answeredCorrectly: state.game.answeredCorrectly,
    nAnsweredRight: state.game.nAnsweredRight,
    clicksPerRightAnswer: state.game.clicksPerRightAnswer,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(Status);
