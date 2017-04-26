import React from 'react';
import * as actions from  '../actions';

export default class AnswerButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        console.log(this.props.chord);
    }

    render(props) {
        return <button onClick={this.onClick}>{this.props.chord}</button>;
    }
}
