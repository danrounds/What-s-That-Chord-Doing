import React from 'react';
import {connect} from 'react-redux';

export class Status extends React.Component {
    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getText() {
        if (!this.props.answeredCorrectly && this.props.guessN)
            return this.getRandom(
                [
                    'Not right','That\'s not it','Wrong','Incorrect','No',
                    'You are wrong','Nope'
                ]);
        else if (this.props.answeredCorrectly)
            return this.getRandom(['You got it!','Yes!','Correct!'])
            +` The ${this.props.chord} chord of ${this.props.key_} is`
            +` ${this.props.chordName}`;

        else
            return '';
    }

    getAverageClicks() {
        if (this.props.clicksPerRightAnswer.length) {
            return String(
                this.props.clicksPerRightAnswer.reduce(
                    (a,b) => a + b)/this.props.clicksPerRightAnswer.length
            ).substring(0,5) + ' guesses per correct answer';
        }
        else
            return '';
    }

    render() {
        return (
            <h3>
              {this.getText()}<br/>
              {this.props.nAnsweredRight} answered correctly<br/>
              {this.getAverageClicks()}
            </h3>
        );
    }
}

const mapStateToProps = (state, props) => ({
    key_: state.keyNameReadable,
    chordName: state.chordName,
    chord: state.chord,
    guessN: state.guessN,
    answeredCorrectly: state.answeredCorrectly,
    nAnsweredRight: state.nAnsweredRight,
    clicksPerRightAnswer: state.clicksPerRightAnswer
});

export default connect(mapStateToProps)(Status);
