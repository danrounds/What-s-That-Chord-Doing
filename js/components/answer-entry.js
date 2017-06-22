import React from 'react';
import {connect} from 'react-redux';
import * as actions from  '../actions';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onKey = this.onKey.bind(this);
        this.buttons = this.makeButtons();
        this.keyMap = this.makeKeyMap();
    }

    makeButtons() {
        return this.props.chordSubset.map((numeral) => {
            return (
                <button key={numeral} onClick={this.onClick}>
                  {numeral}
                </button>
            );
        });
    }

    makeKeyMap() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                      'z','x','c','v','b','n','m',',','.','/'];

        const keyMap = {};
        this.props.chordSubset.map((numeral) => {
            let k = keys.shift();
            keyMap[k] = numeral;
        });
        return keyMap;
    }
    
    onClick(e) {
        if (!this.props.answeredCorrectly) {
            if (e.target.innerHTML === this.props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
            else
                this.props.dispatch(actions.incrementGuessN());
        }
    }

    onKey() {
        if (!this.props.answeredCorrectly) {
            if (this.keyMap[this.props.keyValue]) {
                if (this.keyMap[this.props.keyValue] === this.props.currentChord)
                    this.props.dispatch(actions.markTurnCorrect());
                else
                    this.props.dispatch(actions.incrementGuessN());
            }
        }
    }

    componentDidUpdate() {
        if (this.props.keyValue)
            this.onKey();
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
    keyValue: state.keyValue,
    chordSubset: state.chordSubset,
    currentChord: state.chord,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(AnswerEntry);

