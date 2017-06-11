import React from 'react';
import {connect} from 'react-redux';

import AnswerButton from './answer-button';

export class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.buttons = props.chordSubset.map((numeral) => {
            return (
                <AnswerButton key={numeral} guess={numeral} />
            );
        });
    }

    render() {
        return (
            <div>
              {this.buttons}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    chordSubset: state.chordSubset
});

export default connect(mapStateToProps)(AnswerEntry);

