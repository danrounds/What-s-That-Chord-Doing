import React from 'react';

import AnswerButton from './answer-button';

export default class AnswerEntry extends React.Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick() {
        console.log(this);
    }

    render() {
        return (
            <div>
              <AnswerButton chord="I" />
              <AnswerButton chord="ii°" />
              <AnswerButton chord="ii" />
              <AnswerButton chord="♭III" />
              <AnswerButton chord="♭III+" />
              <AnswerButton chord="iii" />
              <AnswerButton chord="iv" />
              <AnswerButton chord="IV" />
              <AnswerButton chord="V" />
              <AnswerButton chord="♭VI" />
              <AnswerButton chord="vi" />
              <AnswerButton chord="♭VII" />
              <AnswerButton chord="vii°" />
            </div>
        );
    }
}
