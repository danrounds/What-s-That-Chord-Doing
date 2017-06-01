import React from 'react';
import {connect} from 'react-redux';
import * as actions from  '../actions';

export class AnswerButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!this.props.answeredCorrectly) {
            if (this.props.guess === this.props.currentChord) {
                this.props.dispatch(actions.markTurnCorrect());
                console.log('he got it');
            } else {
                this.props.dispatch(actions.incrementGuessN());
                console.log('nope');
            }
        }
    }

    render(props) {
        return <button onClick={this.onClick}>{this.props.guess}</button>;
    }
}

const mapStateToProps = (state, props) => ({
    currentChord: state.chord,
    answeredCorrectly: state.answeredCorrectly
});

export default connect(mapStateToProps)(AnswerButton);
