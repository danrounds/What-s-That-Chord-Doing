import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { HighScoresDisplay } from '../HighScoresDisplay'; // gameType, inv, api.highScores, api.lastHighScoreAccessed;
import { MyScoresDisplay } from '../MyScoresDisplay'; // api.name = 'Somename'; api.authToken...?; 
import { ScoresTable } from '../ScoresTable'; // stub out some API data for display

// These are the tests for the subcomponents of of our Score component

const api = {
    name: 'davey',
    lastHighScoreAccessed: 'hardMajor',
    pending: false,
    error: false,
    myScores: {
        'name': 'davey',
        'scores': {
            'allChordsInv': {
                'totalClicks': 22,
                'nAnsweredRight': 3,
                'nQuestionNumber': 10,
                'winRatio': 0.3
            },
            'easyMajor': {
                'totalClicks': 12,
                'nAnsweredRight': 4,
                'nQuestionNumber': 10,
                'winRatio': 0.4
            }
        }
    },

    highScores: [
        {
            'name': 'ijijijij',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 47,
                    'nAnsweredRight': 10,
                    'nQuestionNumber': 10,
                    'winRatio': 1
                }
            }
        },
        {
            'name': 'bobby4',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 12346,
                    'nAnsweredRight': 124,
                    'nQuestionNumber': 129,
                    'winRatio': 0.9612403100775194
                }
            }
        },
        {
            'name': 'aseofj_',
            'scores': {
                'intermediateMinor': {
                    'totalClicks': 43,
                    'nAnsweredRight': 9,
                    'nQuestionNumber': 10,
                    'winRatio': 0.9
                }
            }
        }
    ]
};

describe('Score-based components', () => {
    // This only checks the "behavior" of part of our tree, but it's quick,
    // dirty, and gives us a reasonable idea that the component is working
    test('HighScoresDisplay', () => {
        const dispatch = (arg) => null;
        const comp = shallow(
            <HighScoresDisplay
               dispatch={dispatch}
               gameType="hardMajor"
               inv={true}
               api={api}
               />);
        comp.setState({ showButtonSubset: 'major' });
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('MyScoresDisplay', () => {
        const dispatch = (arg) => null;
        const comp = shallow(
            <MyScoresDisplay
               dispatch={dispatch}
               api={{ name: 'davey' }}
               />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('ScoresTable', () => {
        const comp = shallow(<ScoresTable tableType="myScores" api={api} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

});
