import React from 'react';
import {connect} from 'react-redux';
import * as actions from  '../actions';
import store from '../store';

export class AnswerButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.dispatch(actions.compareToActual(this.props.chord));
    }

    render(props) {
        return <button onClick={this.onClick}>{this.props.chord}</button>;
    }
}

export default connect()(AnswerButton);
