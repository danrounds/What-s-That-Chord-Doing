import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions';

export class Next extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.questionNumber !== 10)
            this.props.dispatch(actions.getNextQuestion());
    }

    componentDidUpdate() {
        if (['ArrowRight', ' '].indexOf(this.props.keyValue) !== -1) {
            if (this.props.questionNumber !== 10)
                this.props.dispatch(actions.getNextQuestion());
        }
    }

    render() {
        const miniKeyHintStyle = {
            border: '1px solid green',
            borderRadius: '2px',
            backgroundColor: 'green',
            fontSize: '10px',
            color:'white',
            margin: 'auto'
        };

        return(
            <button onClick={this.onClick}>
              next ?
              <div style={miniKeyHintStyle}>SPACE</div>
            </button>
        );
    }
}

const mapStateToProps = (state, props) => ({
    keyValue: state.keyValue,
    questionNumber: state.questionNumber
});

export default connect(mapStateToProps)(Next);
