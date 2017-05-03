import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';
import store from '../store';

export class Next extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.dispatch(actions.getNextQuestion());
    }

    render() {
        return(<button onClick={this.onClick}>next Q</button>);
    }
}

export default connect()(Next);
