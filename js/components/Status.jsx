import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class Status extends React.Component {
    constructor() {
        super();
        this.setStatusText = this.setStatusText.bind(this);
        this.setAverageClicks = this.setAverageClicks.bind(this);
        this.setBetweenTurnStatus = this.setBetweenTurnStatus.bind(this);

        this.state = {
            averageClicksText: (<br/>),
            betweenTurnStatus: (<br/>),
            nRightText: '0 answered correctly',
            statusText: (<br/>),
            stopPrompting: false,
        };
    }

    static getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.guessN || this.props.guess !== nextProps.guess || nextProps.giveUp)
            this.setStatusText(nextProps);
        if (!nextProps.guessN || nextProps.answeredCorrectly) {
            this.setAverageClicks(nextProps);
            this.state.nRightText = nextProps.nAnsweredRight +' answered correctly';
        }
        this.setBetweenTurnStatus(nextProps);
    }

    getInversionInfo(props) {
        const invEl = {
            0: null,
            1: (<span className="inv-glyph">6</span>),
            2: (<span className="inv-glyph">6<span className="low-glyph">4</span></span>),
        }[props.inversionN];

        const bassNoteStr = props.inversionN ? `/${props.notes.bass.split('/')[0]}` : null;

        return [ invEl, bassNoteStr ];
    }

    setStatusText(props) {
        if (!props.answeredCorrectly && props.guessN) {
             const statusText = Status.getRandom(
                [
                    'Not right','That\'s not it','Wrong','Incorrect','No',
                    'You are wrong','Nope'
                ]);
            this.setState({ statusText });

        } else if (props.giveUp || props.answeredCorrectly && !this.state.stopPrompting) {
            const prefix = props.giveUp
                      ? 'That\'s okay.'
                      : Status.getRandom(['You got it!','Yes!','Correct!']);

            const [ invEl, bassNoteStr ] = this.getInversionInfo(props);
            const statusText = (
                <div>
                  {prefix} The {props.chord}{invEl} chord of {props.key_} is {props.chordName}{bassNoteStr}
                </div>
            );

            this.setState({ statusText, stopPrompting: true });

        } else if (!(this.state.stopPrompting && props.guessN)) {
            this.setState({ statusText: (<br/>), stopPrompting: false });
        }
    }

    setAverageClicks(props) {
        const averageClicksEl = (props.clicksPerRightAnswer.length) ?
            String(
                props.clicksPerRightAnswer.reduce(
                    (a,b) => a + b)/props.clicksPerRightAnswer.length
            ).substring(0,5) + ' guesses per correct answer'
            : (<br/>);
        this.setState({ averageClicksText: averageClicksEl });
    }

    setBetweenTurnStatus(props) {
        let element;
        if (props.gameOver) {
            if (props.displayKeyboardShortcuts)
                element = (
                    <div>
                      Game over! Press&nbsp;
                      <span className="keyHint">ENTER</span> to&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={() => {
                             props.dispatch(actions.startNewGame(props.mode,
                                                                 props.inversions));
                             if (props.api.authToken) {
                                 props.dispatch(actions.getMyScores(props.api.authToken));
                             }
                        }}>
                        play again
                      </a>
                    </div>);
            else
                element = (
                    <div>Game over!&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={
                             () => {props.dispatch(actions.startNewGame(props.mode,props.inversions));
                                    if (props.api.authToken) {
                                        props.dispatch(actions.getMyScores(props.api.authToken));
                                    }
                        }}>
                        Play again?
                    </a></div>);
        } else if (props.answeredCorrectly) {
            if (props.displayKeyboardShortcuts)
                element = (
                    <div>
                      Press <span className="keyHint">SPACE</span> for&nbsp;
                      <a className="game-link" href="javascript:void(0)"
                         onClick={() => props.dispatch(
                        actions.getNextQuestion())}>the next question
                      </a>
                    </div>);
            else
                element = (
                    <a className="game-link" href="javascript:void(0)"
                       onClick={() => props.dispatch(
                      actions.getNextQuestion())}>Want the next question?
                    </a>
                );
        } else if (!props.guessN) {
            element = (<div>Guess the chord based on context!</div>);
        } else {
            element = (<br/>);
        }
        this.setState({ betweenTurnStatus: element });
    }

    render() {
        return (
            <div className="status-box">
              <h3 className="status-feedback">{this.state.statusText}</h3>
              <h3 className="status-secondary">{this.state.nRightText}</h3>
              <h3 className="status-secondary">{this.state.averageClicksText}</h3>
              <h2 className="status-primary">{this.state.betweenTurnStatus}</h2>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    displayKeyboardShortcuts: state.ui.displayKeyboardShortcuts,
    api: state.api,
    key_: state.game.keyNameReadable,
    chordName: state.game.chordName,
    chord: state.game.chord,
    notes: state.game.notes,
    inversionN: state.game.inversionN,
    guess: state.game.guess,
    guessN: state.game.guessN,
    answeredCorrectly: state.game.answeredCorrectly,
    giveUp: state.game.giveUp,
    nAnsweredRight: state.game.nAnsweredRight,
    clicksPerRightAnswer: state.game.clicksPerRightAnswer,
    gameOver: state.game.gameOver,
});

export default connect(mapStateToProps)(Status);
