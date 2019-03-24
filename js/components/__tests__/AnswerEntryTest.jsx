import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import {chordSets} from '../../musicLogic';
import {AnswerEntry} from '../AnswerEntry';

// AnswerEntry is one of our more "stateful" components. It deserves some tests
// with differing conditions

const props = {
    answeredCorrectly: false,
    displayKeyboardShorcuts: true,
    guessN: 4,
    chordSubset: chordSets.hardMinor,
    currentChord: 'vii°',
};

describe('Component: AnswerEntryTest', () => {
    it('should render', () => {
        const comp = renderer.create(<AnswerEntry {...props} />).toJSON();
        expect(comp).toMatchSnapshot();
    });

    it('should register wrong answers', () => {
        // Using the shallow renderer here, because it can .setState
        const comp = shallow(<AnswerEntry {...props} />);
        comp.setProps({ guess: 'vi' });
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('should register right answers', () => {
        // Using the shallow renderer here, because it can .setState
        const comp = shallow(<AnswerEntry {...props} />);
        comp.setProps({ guess: 'vii°' }).render();
        expect(toJson(comp)).toMatchSnapshot();
    });

    it('should display keyboard shortcuts', () => {
        // We need `mount` to get the right level of depth to test whether or
        // not our keyHints are being displayed
        const comp = mount(<AnswerEntry displayKeyboardShortcuts={true} chordSubset={chordSets.hardMinor} />);
        expect(toJson(comp.find('.keyHint'))).not.toEqual(null);
    });

    it('should /not/ display keyboard shortcuts, when appropriate', () => {
        // We need `mount` to get the right level of depth to test whether or
        // not our keyHints are being displayed
        const comp = mount(<AnswerEntry displayKeyboardShortcuts={false} chordSubset={chordSets.hardMinor} />);
        expect(toJson(comp.find('.keyHint'))).toEqual(null);
    });

});
