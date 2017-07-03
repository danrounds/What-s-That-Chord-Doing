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
    }

    makeButtons() {
        const keys = ['a','s','d','f','g','h','j','k','l',';',
                     'z','x','c','v','b','n','m',',','.','/'];

        const keyHintStyleBig = {
            border: '1px solid green',
            borderRadius: '2px',
            backgroundColor: 'green',
            fontSize: '14px',
            color:'white',
            margin: 'auto',
            width: '15px'
        };

        const buttonStyle = {
            fontSize: '20px',
            height: '60px',
            width: '50px'
        };

        const buttonWrongStyle = {
            border: '1px',
            backgroundColor: 'red',
            fontSize: '20px',
            height: '60px',
            width: '50px'         
        };

        const buttonRightStyle = {
            border: '1px',
            backgroundColor: 'deepskyblue',
            fontSize: '20px',
            height: '60px',
            width: '50px'
        };

        return this.props.chordSubset.map((numeral) => {
            let k = keys.shift();

            return (
                <button style={this.guess === numeral ?
                               (numeral === this.props.currentChord ? buttonRightStyle : buttonWrongStyle)
                        : buttonStyle}
                        key={numeral} onClick={this.onClick}>
                  {numeral}<br/>
                  {1 ? <div style={keyHintStyleBig}>{k}</div> : null}
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
        this.buttons = this.makeButtons();
    }

    componentWillUpdate() {
        this.buttons = this.makeButtons();
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
    guessN: state.guessN,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(AnswerEntry);

