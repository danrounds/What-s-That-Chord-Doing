import React from 'react';
import {connect} from 'react-redux';
import * as actions from  '../actions';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        const keys = ['q','w','e','r','t','y','u','i','o','p',
                      'a','s','d','f','g','h','j','k','l',';'];

        this.buttons = props.chordSubset.map((numeral) => {
            let k = keys.shift();
            return (
                <button key={numeral} onKeyPress={this.handleKeyPress}
                        onClick={this.onClick}>
                  {numeral}
                </button>
            );
        });
    }

    onClick(e) {
        if (!this.props.answeredCorrectly) {
            if (e.target.innerHTML === this.props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
            else
                this.props.dispatch(actions.incrementGuessN());
        }
    }

    handleKeyPress(e) {
        console.log('OK');
        if (e.key === this.props.buttonShortcut)
            // this.onClick();
            console.log('OK');
    }

    render() {
        return (
            <div>
              {this.buttons}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    chordSubset: state.chordSubset,
    currentChord: state.chord,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(AnswerEntry);

