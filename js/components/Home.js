import React from 'react';
import {Link} from 'react-router';
import {Provider} from 'react-redux';

import store from '../store';

import NavBar from './NavBar';
import LessonsNavigator from './LessonsNavigator';
import KeyboardNavLessonListOverlay from './KeyboardNavLessonListOverlay';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.Home = (
            <div>
              <NavBar parent="Home"/>
              <LessonsNavigator />
              <KeyboardNavLessonListOverlay />
            </div>
        );
    }

    componentDidMount() {
        this.props.instrument.then(piano => {
            piano.stop();
        });
    }


    render(props) {
        return(
              <Provider store={store}>
                {this.Home}
              </Provider>
        );
    }
}
