import React from 'react';
import {Link} from 'react-router';
import {Provider} from 'react-redux';

import store from '../store';

import NavBar from './nav-bar';
import LessonsNavigator from './lessons-navigator';

export default class Home extends React.Component {
    componentDidMount() {
        this.props.instrument.then(piano => {
            piano.stop();
        });
    }

    render(props) {
        return(
            <div>
              <Provider store={store}>
                <NavBar parent="Home"/>
              </Provider>
              <Provider store={store}>
                <LessonsNavigator />
              </Provider>
            </div>
        );
    }

}
