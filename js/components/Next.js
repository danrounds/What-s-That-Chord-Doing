import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class Next extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { showKeyboardShortcuts: this.props.displayKeyboardShortcuts };
        // /\ this is kept as a "last state" variable, and compared to props
        // in the event that it changes
    }

    componentDidUpdate() {
        if (['ArrowRight', ' '].indexOf(this.props.keyValue) !== -1)
            if (this.props.questionNumber !== 10)
                this.props.dispatch(actions.getNextQuestion());
        else if (this.state.showKeyboardShortcuts !== this.props.displayKeyboardShortcuts)
            this.setState({ showKeyboardShortcuts: this.props.displayKeyboardShortcuts });
    }

    onClick() {
        if (this.props.questionNumber !== 10)
            this.props.dispatch(actions.getNextQuestion());
    }

    render() {
        return(
            <button className="nxtBtn" onClick={this.onClick}>
              next ?
              {this.props.displayKeyboardShortcuts
                  ? <div className="keyHint miniKeyHint">SPACE</div>
              : null}
            </button>
        );
    }
}

const mapStateToProps = (state, props) => ({
    keyValue: state.game.keyValue,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    questionNumber: state.game.questionNumber
});

export default connect(mapStateToProps)(Next);
