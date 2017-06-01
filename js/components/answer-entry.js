import React from 'react';

import AnswerButton from './answer-button';

export default class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <AnswerButton guess="i" />
              <AnswerButton guess="I" />
              <AnswerButton guess="♭II" />
              <AnswerButton guess="ii°" />
              <AnswerButton guess="ii" />
              <AnswerButton guess="♭III" />
              <AnswerButton guess="iii" />
              <AnswerButton guess="iv" />
              <AnswerButton guess="IV" />
              <AnswerButton guess="v" />
              <AnswerButton guess="V" />
              <AnswerButton guess="♭VI" />
              <AnswerButton guess="vi" />
              <AnswerButton guess="♭VII" />
              <AnswerButton guess="vii°" />
            </div>
        );
    }

}
