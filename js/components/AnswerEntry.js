import React from 'react';
import { connect } from 'react-redux';

import * as actions from  '../actions';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onKey = this.onKey.bind(this);

        this.keyMap = this.makeKeyMap();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.giveUp && !nextProps.answeredCorrectly && nextProps.keyValue)
            this.onKey(nextProps);
    }

    onClick(e){
        if (!this.props.giveUp && !this.props.answeredCorrectly) {
            let guess;

            // We're either clicking a button or something deeper in our tree
            if (e.target.parentElement.nodeName === 'BUTTON')
                guess =  e.target.parentElement.innerText.split('\n')[0];
            else
                guess = e.target.innerText.split('\n')[0];

            // Actions:
            this.props.dispatch(actions.makeGuess(guess));
            if (guess === this.props.currentChord)
                this.props.dispatch(actions.markTurnCorrect());
        }
    }

    onKey(props) {
        const currentGuess = this.keyMap[props.keyValue];
        if (this.keyMap[props.keyValue]) {
            if (currentGuess !== this.props.guess) {
                this.props.dispatch(actions.makeGuess(currentGuess));

                if (this.keyMap[props.keyValue] === props.currentChord)
                    this.props.dispatch(actions.markTurnCorrect());
            }
        }
    }

    makeKeyMap() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                      'z','x','c','v','b','n','m',',','.','/'];

        const keyMap = {};
        this.props.chordSubset.map(numeral => {
            let k = keys.shift();
            keyMap[k] = numeral;
        });
        return keyMap;
    }

    makeButtons() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                      'z','x','c','v','b','n','m',',','.','/'];


        return this.props.chordSubset.map(numeral => {
            let k = keys.shift();

            let buttonClass;
            if (this.props.giveUp && numeral === this.props.currentChord)
                buttonClass = 'buttonGiveUpStyle';
            else if (this.props.guess === numeral)
                buttonClass = (numeral === this.props.currentChord) ? 'buttonRightStyle' : 'buttonWrongStyle';
            else
                buttonClass = 'buttonStyle';

            const keyHints = this.props.displayKeyboardShortcuts && (<div className="keyHint answerKeyHint">{k}</div>);

            return (
                <button className={buttonClass} key={numeral} onClick={this.onClick}>
                  {numeral}<br/>
                  {keyHints}
                </button>
            );
        });
    }

    render() {
        return (<div>{this.makeButtons()}</div>);
    }
}

const mapStateToProps = (state) => ({
    keyValue: state.game.keyValue,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    chordSubset: state.game.chordSubset,
    currentChord: state.game.chord,
    guess: state.game.guess,
    guessN: state.game.guessN,
    answeredCorrectly: state.game.answeredCorrectly,
    giveUp: state.game.giveUp,
});

export default connect(mapStateToProps)(AnswerEntry);
