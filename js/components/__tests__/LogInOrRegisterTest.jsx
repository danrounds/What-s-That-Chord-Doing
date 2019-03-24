import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { LogInOrRegister } from '../LogInOrRegister';

// Testing the various permutations of state that our LogIn... component might
// encounter. Really just testing rendering, here

describe('Score-based components', () => {
    // Success:
    test('LogInOrRegister, when log-in succeeds', () => {
        const comp = shallow(<LogInOrRegister api={{ authToken: 'some_string' }}/>);
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('LogInOrRegister, when registration succeeds', () => {
        const comp = shallow(<LogInOrRegister api={{ authToken: 'some_string' }}/>);
        comp.setState({ register: true });
        expect(toJson(comp)).toMatchSnapshot();
    });    

    // Pending:
    test('LogInOrRegister, when logging in & pending', () => {
        const comp = shallow(<LogInOrRegister api={{}}/>);
        comp.setProps({ api: { pending: true }});
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('LogInOrRegister, when registering & pending', () => {
        const comp = shallow(<LogInOrRegister api={{}} />);
        comp.setState({ register: true });
        comp.setProps({ api: { pending: true }});
        expect(toJson(comp)).toMatchSnapshot();
    });

    // Errors:
    test('LogInOrRegister, when logging in & username doesn\'t exist', () => {
        const comp = shallow(<LogInOrRegister api={{ pending: true }}/>);
        comp.setProps({ api: { error: 404 }});
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('LogInOrRegister, when logging in & password is wrong', () => {
        const comp = shallow(<LogInOrRegister api={{ pending: true }}/>);
        comp.setProps({ api: { error: 401 }});
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('LogInOrRegister, when registering & username already exists', () => {
        const comp = shallow(<LogInOrRegister api={{ pending: true }}/>);
        comp.setState({ register: true });
        comp.setProps({ api: { error: 409 }});
        expect(toJson(comp)).toMatchSnapshot();
    });

    test('LogInOrRegister, when server doesn\'t respond', () => {
        const comp = shallow(<LogInOrRegister api={{ pending: true }}/>);
        comp.setProps({ api: { error: 'other' }});
        expect(toJson(comp)).toMatchSnapshot();
    });
});
