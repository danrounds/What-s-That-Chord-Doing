import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

import store from '../store';

import NavBar from './nav-bar';

export default class WhatIsThis extends React.Component {
    render() {
        return (
            <div>
              <Provider store={store}>
                <NavBar parent="WhatIs"/>
              </Provider>
              <p>Explanation of game goes here</p>
            </div>
        );
    }
}
