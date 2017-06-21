import React from 'react';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

import Game from './game';

import * as actions from '../actions/';
import store from '../store';

export default class GameWrapper extends React.Component {
    render(props) {
        return (
            <Provider store={store}>
              <Game mode={this.props.mode}
                    inversions={this.props.inversions || false}
                    instrument={this.props.instrument}
                    ac={this.props.ac}/>
            </Provider>
        );
    }
}
