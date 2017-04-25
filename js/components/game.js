import React from 'react';

import Staves from './staves';
import Audio from './audio';
import AnswerEntry from './answer-entry';
import KofN from './k-of-n';
import Next from './next';

export default function Game() {
    return (
        <div>
          <Staves />
          <AnswerEntry />
          <KofN />
          <Audio />
          <Next />
        </div>
    );
}
