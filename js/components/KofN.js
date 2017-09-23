import React from 'react';
import {connect} from 'react-redux';

export class KofN extends React.Component {
    render() {
        return (<p className="k-of-n">Question {this.props.questionNumber} of 10</p>);
    }
}

export default connect((state) => ({ questionNumber: state.game.questionNumber }))(KofN);
