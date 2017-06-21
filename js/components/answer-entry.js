import React from 'react';
import {connect} from 'react-redux';
import * as actions from  '../actions';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.buttons = this.makeButtons();
    }

    makeButtons() {
        const keys = ['q','w','e','r','t','y','u','i','o','p',
                      'a','s','d','f','g','h','j','k','l',';'];

        return this.props.chordSubset.map((numeral) => {
            let k = keys.shift();
            return (
                <button key={numeral} onClick={this.onClick}>
                  {numeral}
                </button>
            );
            // return (
            //     <button key={numeral} onClick={this.onClick} onKeyPress={this.handleKeyPress}>
            //       {numeral}
            //     </button>
            // );
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

