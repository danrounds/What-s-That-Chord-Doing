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
        
        const miniKeyHintStyle = {
            border: '1px solid green',
            borderRadius: '2px',
            backgroundColor: 'green',
            // fontSize: '10px',
            color:'white',
            margin: 'auto'
        };

        if (this.props.gameOver) {
            if (this.props.displayKeyboardShortcuts)
                return (
                    <div>
                      Game over! Press <span style={miniKeyHintStyle}>ENTER</span> to <a href="javascript:void(0)"
                                                                                         onClick={() => this.props.dispatch(
                        actions.startNewGame(this.props.mode,this.props.inversions))}>
                        play again
                      </a>
                    </div>);
            else
                return (
                    <div>Game over! <a href="javascript:void(0)"
                                       onClick={() => this.props.dispatch(
                        actions.startNewGame(this.props.mode,this.props.inversions))}>
                        Play again?
                    </a></div>);
        } else if (this.props.answeredCorrectly) {
            if (this.props.displayKeyboardShortcuts)
                return (
                    <div>
                      Press <span style={miniKeyHintStyle}>SPACE</span> for&nbsp;
                      <a href="javascript:void(0)" onClick={() => this.props.dispatch(
                        actions.getNextQuestion())}>the next question
                      </a>
                    </div>);
            else
                return (
                    <a href="javascript:void(0)"
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
            <div style={{height: '115px', margin:'10px 5px 10px 5px'}}>
              <h3 className="status-feedback">{this.getStatusText()}</h3>
              <h3 className="status-secondary">{this.nRightText = this.props.nAnsweredRight +' answered correctly'}</h3>
              <h3 className="status-secondary">{this.getAverageClicks()}</h3>
              <h2 className="status-primary">{this.getBetweenTurnStatus()}</h2>
            </div>
        );
    }

}

const mapStateToProps = (state, props) => ({
    keyValue: state.keyValue,
    displayKeyboardShortcuts: state.displayKeyboardShortcuts,
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
