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
            return this.getRandom(['You got it!','Yes!','Correct!']) +
            ` ${this.props.chordName} is the ${this.props.chord} chord of `
            +`${this.props.key_}`;
        else
            return '';
    }

    render() {
        return (<h3>{this.getText()}</h3>);
    }
}

const mapStateToProps = (state, props) => ({
    key_: state.keyNameReadable,
    chordName: state.chordName,
    chord: state.chord,
    guessN: state.guessN,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(Status);
