import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

import WhatIsThis from './WhatIsThis';

import store from '../store';

export default class GameWrapper extends React.Component {
    render(props) {
        return (
            <Provider store={store}>
              <WhatIsThis instrument={this.props.instrument}
                          ac={this.props.ac}/>
            </Provider>
        );
    }
}
