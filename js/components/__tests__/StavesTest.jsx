import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Staves } from '../Staves';

// This is another sort of subtle component; took some tinkering to get it
// testing after the correct state change.

const notAnswered = {
    notes: null,
    accidentals: null,
    keySignature: 'Dm',
    guessN: null,
    answeredCorrectly: false,
};

const answered = {
    notes: { bass: 'E#/4', treble: [ 'C#/5', 'E#/5', 'A#/5' ], },
    accidentals: { bassAccidental: false, trebleIndices: [] },
    keySignature: 'C#',
    // notes: { bass: 'E#/4', treble: [ 'C#/5', 'E#/5', 'G#/5' ], },
    // accidentals: { bassAccidental: true, trebleIndices: [] },
    // keySignature: 'F#',

    answeredCorrectly: true,
}

describe('Component: Staves', () => {
    it('should render blank staves', () => {
        // Through extensive um... testing of these tests, I've determined that
        // it is actually testing what we want, and that it represents a stable
        // state for blank staves

        const inter = mount(<Staves {...notAnswered} />);
        const comp = inter.setProps({...notAnswered}).render();
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('should render a chord', () => {
        // Same as the above, but now we're rendering notes. To see what I mean,
        // try replacing the notes, accidentals, or keySignature key:values in
        // the `answered` props object, above

        const inter = mount(<Staves {...answered} />);
        const comp = inter.setProps({...answered}).render();
        expect(toJson(comp)).toMatchSnapshot();
    });

});
