import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class Next extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate() {
        if (['ArrowRight', ' '].indexOf(this.props.keyValue) !== -1)
            if (this.props.questionNumber !== 10)
                this.props.dispatch(actions.getNextQuestion());
    }

    onClick() {
        if (this.props.questionNumber !== 10)
            this.props.dispatch(actions.getNextQuestion());
    }

    render() {
        return(
            <button className="ctrl-btn nxt-btn" onClick={this.onClick}>
              <div className="nxt-text">next ?</div>
              {this.props.displayKeyboardShortcuts
                  && <div className="keyHint miniKeyHint nxtKeyHint">SPACE</div>}
            </button>
        );
    }
}

const mapStateToProps = (state) => ({
    keyValue: state.game.keyValue,
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts,
    questionNumber: state.game.questionNumber
});

export default connect(mapStateToProps)(Next);
