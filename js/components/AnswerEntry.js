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
        this.guess = null;
        this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
    }


    componentWillUpdate() {
        this.buttons = this.makeButtons();
    }

    componentDidUpdate() {
        if (this.props.keyValue)
            this.onKey();

        if (this.props.answeredCorrectly)
            this.endTurn = true;

        if (this.endTurn) {
            if (!this.props.guessN) {
                this.endTurn = false;
                this.guess = null;
                this.forceUpdate();
            }
        }

        if (this.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts) {
            this.showKeyboardShortcuts = this.props.displayKeyboardShortcuts;
            this.forceUpdate();
        }

        this.buttons = this.makeButtons();
    }

    onClick(e) {
        if (!this.props.answeredCorrectly) {

            // We're either clicking a button or something deeper in our tree
            if (e.target.parentElement.nodeName === 'BUTTON')
                this.guess = e.target.parentElement.innerText.split('\n')[0];
            else
                this.guess = e.target.innerText.split('\n')[0];

            // actions
            if (this.guess === this.props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
            else
                this.props.dispatch(actions.incrementGuessN());
        }
    }

    onKey() {
        if (!this.props.answeredCorrectly) {
            this.guess = this.keyMap[this.props.keyValue] || null;
            if (this.keyMap[this.props.keyValue]) {
                if (this.keyMap[this.props.keyValue] === this.props.currentChord)
                    this.props.dispatch(actions.markTurnCorrect());
                else
                    this.props.dispatch(actions.incrementGuessN());
            }
        }
    }

    makeButtons() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                     'z','x','c','v','b','n','m',',','.','/'];

        return this.props.chordSubset.map((numeral) => {
            let k = keys.shift();

            return (
                <button className={this.guess === numeral
                                   ? (numeral === this.props.currentChord
                                      ? "buttonRightStyle"
                                      : "buttonWrongStyle"
                                     )
                        : "buttonStyle"}
                        key={numeral} onClick={this.onClick}>
                  {numeral}<br/>
                  {this.props.displayKeyboardShortcuts
                      && <div className="keyHint answerKeyHint">{k}</div>}
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

    render() {
        return (
            <div>
              {this.buttons}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    keyValue: state.game.keyValue,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    chordSubset: state.game.chordSubset,
    currentChord: state.game.chord,
    guessN: state.game.guessN,
    answeredCorrectly: state.game.answeredCorrectly
});

export default connect(mapStateToProps)(AnswerEntry);
