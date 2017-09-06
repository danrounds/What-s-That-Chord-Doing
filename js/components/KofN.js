import React from 'react';
import {connect} from 'react-redux';

export class KofN extends React.Component {
    render() {
        return (<p className="k-of-n">Question {this.props.questionNumber} of 10</p>);
    }
}

const mapStateToProps = (state) => ({
    questionNumber: state.game.questionNumber
});

export default connect(mapStateToProps)(KofN);
