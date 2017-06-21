import React from 'react';
import store from '../store';
import {Provider} from 'react-redux';

import Game from './game';

export default class GameWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.getFocus = this.getFocus.bind(this);
    }

    getFocus() {
        this.inputField.focus();
    };

    handleKey(e) {
        alert(e);
    };

    componentDidMount() {
        this.getFocus();
    }

    componentDidUpdate() {
        this.getFocus();
    }

    render(props) {
        return (
            <Provider store={store}>
              <div tabIndex="0" onKeyPress={this.handleKey}
                   onBlur={this.getFocus}
                   ref={element => { this.inputField = element; }}>
                <Game mode={this.props.mode}
                      inversions={this.props.inversions || false}
                      instrument={this.props.instrument}
                      ac={this.props.ac}/>
              </div>
            </Provider>
        );
    }

    // render(props) {
    //     return (
    //         <Provider store={store}>
    //           <div>
    //             <Game mode={this.props.mode}
    //                   onBlur={this.getFocus} 
    //                   onKeyPress={this.handleKey}
    //                   ref={element => { this.inputField = element; }}
    //               inversions={this.props.inversions || false}
    //               instrument={this.props.instrument}
    //               ac={this.props.ac}
    //               autoFocus/>
    //           </div>
    //         </Provider>
    //     );
    // }
}
