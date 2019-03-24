import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Game } from '../Game';
import Home from '../Home';
import { NavBar } from '../NavBar';
import Scores from '../Scores';
import { WhatIsThis } from '../WhatIsThis';

// These are components that really, /really/ want a Store passed to them,
// unless we use the shallow renderer. These are all rendering-oriented tests

describe('Score-based components', () => {

    test('Game', () => {
        const dispatch = (arg) => null;
        const comp = shallow(<Game dispatch={dispatch} mode="allChords" inversions={false} api={{}}/>);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('Home', () => {
        const comp = shallow(<Home instrument={{ then: (arg) => null }} />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('NavBar', () => {
        const comp = shallow(<NavBar parent="Home" api={{ authToken: 'some_string' }}/>);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('Scores', () => {
        const comp = shallow(<Scores />);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('WhatIsThis', () => {
        const comp = shallow(<WhatIsThis introChordSequence={[]} />);
        expect(toJson(comp)).toMatchSnapshot();
    });    

});
