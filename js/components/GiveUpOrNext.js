import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

export class GiveUpOrNext extends React.Component {
    constructor() {
        super();
        this.handleGiveUpOrNext = this.handleGiveUpOrNext.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (['ArrowRight', ' '].includes(nextProps.keyValue))
            this.handleGiveUpOrNext(nextProps);
    }

    handleGiveUpOrNext(props) {
        if (!props.answeredCorrectly && !props.giveUp)
            props.dispatch(actions.giveUp());
        else if (props.questionNumber !== 10)
            props.dispatch(actions.getNextQuestion());
        else if (props.questionNumber === 10) {
            props.dispatch(actions.startNewGame(props.gameType, props.inversions));
            if (props.api.authToken)
                props.dispatch(actions.getMyScores(props.api.authToken));
        }
    }

    render() {
        return (
            <button className="ctrl-btn nxt-btn" onClick={() => this.handleGiveUpOrNext(this.props)}>
              <div className="nxt-text">{ this.props.giveUp || this.props.answeredCorrectly ? 'next?' : 'give up?' }</div>
              {this.props.displayKeyboardShortcuts
              && <div className="keyHint miniKeyHint nxtKeyHint">SPACE</div>}
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    displayKeyboardShortcuts: state.ui.displayKeyboardShortcuts,
    api: state.api,
    keyValue: state.game.keyValue,
    gameType: state.game.gameType,
    inversions: state.game.inversions,
    questionNumber: state.game.questionNumber,
    guessN: state.game.guessN,
    giveUp: state.game.giveUp,
    answeredCorrectly: state.game.answeredCorrectly,
});

export default connect(mapStateToProps)(GiveUpOrNext);
