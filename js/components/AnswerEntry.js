import React from 'react';
import {connect} from 'react-redux';

import * as actions from  '../actions';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onKey = this.onKey.bind(this);

        this.keyMap = this.makeKeyMap();
        this.state = { guess: null };
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.answeredCorrectly && nextProps.keyValue)
            this.onKey(nextProps);
        else if (!nextProps.guessN && this.state.guess !== null)
            this.setState({ guess: null });
    }

    onClick(e){
        if (!this.props.answeredCorrectly) {
            let guess;

            // We're either clicking a button or something deeper in our tree
            if (e.target.parentElement.nodeName === 'BUTTON')
                guess =  e.target.parentElement.innerText.split('\n')[0];
            else
                guess = e.target.innerText.split('\n')[0];

            this.setState({ guess });

            // actions
            if (guess === this.props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
            else
                this.props.dispatch(actions.incrementGuessN());
        }
    }

    onKey(props) {
        this.setState({ guess: this.keyMap[props.keyValue] || null });
        if (this.keyMap[props.keyValue]) {
            if (this.keyMap[props.keyValue] === props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
            else
                this.props.dispatch(actions.incrementGuessN());
        }
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

    makeButtons() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                      'z','x','c','v','b','n','m',',','.','/'];


        return this.props.chordSubset.map((numeral) => {
            let k = keys.shift();

            return (
                <button className={this.state.guess === numeral
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

    render() {
        return (
            <div>
              {this.makeButtons()}
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
