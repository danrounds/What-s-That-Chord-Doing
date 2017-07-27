import React from 'react';

import NavBar from './NavBar';
import LessonsNavigator from './LessonsNavigator';
import KeyboardNavLessonListOverlay from './KeyboardNavLessonListOverlay';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.instrument.then(piano => {
            piano.stop();
        });
    }

    render(props) {
        return(
            <div>
              <NavBar parent="Home"/>
              <LessonsNavigator />
              <KeyboardNavLessonListOverlay />
            </div>
        );
    }
}
