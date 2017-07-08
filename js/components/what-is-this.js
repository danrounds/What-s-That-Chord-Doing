import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

import store from '../store';

import NavBar from './nav-bar';

export default class WhatIsThis extends React.Component {
    render() {
        return (
            <Provider store={store}>
              <NavBar parent="WhatIs"/>
            </Provider>
        );
    }
}

// const mapStateToProps = (state, props) => ({
//     displayKeyboardShortcuts: state.displayKeyboardShortcuts
// });

// export default connect(mapStateToProps)(WhatIsThis);
