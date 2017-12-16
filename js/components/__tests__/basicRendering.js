import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { GameModeText } from '../GameModeText';
import { KeyboardNavLessonListOverlay } from '../KeyboardNavLessonListOverlay';
import { KeyboardShortcutsOnOff } from '../KeyboardShortcutsOnOff';
import { KofN } from '../KofN';
import { LessonsNavigator } from '../LessonsNavigator';
import { GiveUpOrNext } from '../GiveUpOrNext';
import { PlayAudio } from '../PlayAudio';
import { StartNewGame } from '../StartNewGame';
import { Status } from '../Status';

describe('Components: Basic rendering', () => {

    test('GameModeText', () => {
        const comp = renderer.create(
            <GameModeText gameType="hardMinor" inversions={true} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    test('KeyboardNavLessonListOverlay, w/ keyboard shortcuts', () => {
        const comp = renderer.create(
            <KeyboardNavLessonListOverlay displayKeyboardShortcuts={true} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });
    test('KeyboardNavLessonListOverlay, w/out keyboard shortcuts', () => {
        const comp = renderer.create(
            <KeyboardNavLessonListOverlay displayKeyboardShortcuts={true} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    test('KofN', () => {
        const comp = renderer.create(
            <KofN questionNumber={3} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    test('LessonsNavigator', () => {
        const comp = mount(
            <LessonsNavigator
               lessonIndexDisplay={{ easy: true, novice: true, difficult: true, i: 1 }} />
        );
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('GiveUpOrNext, w/ keyboard shortcuts', () => {
        const comp = renderer.create(
            <GiveUpOrNext displayKeyboardShortcuts={true} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });
    test('GiveUpOrNext, w/out keyboard shortcuts', () => {
        const comp = renderer.create(
            <GiveUpOrNext displayKeyboardShortcuts={false} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    const instrument = {then : () => null}, ac = {};
    test('PlayAudio, w/ keyboard shortcuts', () => {
        const comp = renderer.create(
            <PlayAudio displayKeyboardShortcuts={true} ac={ac} instrument={instrument} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });
    test('PlayAudio, w/out keyboard shortcuts', () => {
        const comp = renderer.create(
            <PlayAudio displayKeyboardShortcuts={true} ac={ac} instrument={instrument} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    test('StartNewGame, w/ keyboard shortcuts', () => {
        const comp = renderer.create(
            <StartNewGame displayKeyboardShortcuts={true} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });
    test('StartNewGame, w/out keyboard shortcuts', () => {
        const comp = renderer.create(
            <StartNewGame displayKeyboardShortcuts={false} />
        ).toJSON();
        expect(comp).toMatchSnapshot();
    });

    test('Status, basic render w/ keyboard shortcuts', () => {
        const comp = mount(
            <Status
               displayKeyboardShorcuts={true}
               key_="Eb Major"
               chordName="G minor"
               chord="iii"
               answeredCorrectly={true}
               nAnsweredRight={4}
               clicksPerRightAnswer={[3,12]}
               gameOver={true}
               />
        );
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('Status, basic render, w/out keyboard shortcuts', () => {
        const comp = mount(
            <Status
               displayKeyboardShorcuts={false}
               key_="Eb Major"
               chordName="G minor"
               chord="iii"
               answeredCorrectly={true}
               nAnsweredRight={4}
               clicksPerRightAnswer={[3,12]}
               gameOver={true}
               />
        );
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('Status, correct answer', () => {
        const props = {
            answeredCorrectly: true,
            nAnsweredRight: 4,
            clicksPerRightAnswer: [3,12],
            gameOver: true,
            guess: 'iii',
            guessN: 3,
        };
        const key_ = 'Eb Major', chordName = 'G minor', chord = 'iii';
        const comp = mount(
            <Status displayKeyboardShorcuts={true}
                    key_={key_}
                    chordName={chordName}
                    chord={chord}
                    answeredCorrectly={true}
                    nAnsweredRight={4}
                    clicksPerRightAnswer={[3,12]}
                    gameOver={true}
                    />
        );
        comp.setProps(props);
        const statusMatch = new RegExp(`[You\ got\ it\!|Yes\!|Correct\!]\ The\ `
                                       +chord+`\ chord\ of\ `+key_+`\ is\ `
                                       +chordName);
        expect(comp.find('.status-feedback').text()).toMatch(statusMatch);
        expect(comp.find('.status-secondary').at(0).text()).toMatch(/\d\ answered\ correctly/);
        expect(comp.find('.status-secondary').at(1).text()).toMatch(/\d\.\d*\ guesses\ per\ correct\ answer/);
    });

    test('Status, wrong answer', () => {
        const props = {
            answeredCorrectly: false,
            nAnsweredRight: 4,
            guess: 'vi',
            guessN: 4,
            clicksPerRightAnswer: [3,12],
            gameOver: false,
        };
        const comp = mount(
            <Status
               displayKeyboardShorcuts={true}
               key_="Eb Major"
               chordName="G minor"
               chord="iii"
               answeredCorrectly={false}
               nAnsweredRight={4}
               guessN={4}
               clicksPerRightAnswer={[3,12]}
               gameOver={false}
               />
        );
        comp.setProps(props);
        expect(comp.find('.status-feedback').text()).toMatch(
                /Not\ right|That\'s\ not\ it|Wrong|Incorrect|No|You\ are\ wrong|Nope/);
    });

});
