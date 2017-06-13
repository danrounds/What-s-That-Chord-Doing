import React from 'react';
import {connect} from 'react-redux';

export class KofN extends React.Component {
    render() {
        return (<p>Question {this.props.questionNumber} of 10</p>);
    }
}

const mapStateToProps = (state, props) => ({
    questionNumber: state.questionNumber
});

export default connect(mapStateToProps)(KofN);
