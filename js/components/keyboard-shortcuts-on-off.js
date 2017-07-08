import React from 'react';
import {connect} from 'react-redux';

import * as actions from  '../actions';

export class KeyboardShortcutsOnOff extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.dispatch(actions.toggleKeyboardShortcutDisplay(
            !this.props.displayKeyboardShortcuts));
    }

    componentWillMount() {
        this.props.dispatch(actions.toggleKeyboardShortcutDisplay(
            this.props.showHints));
    }

    render() {
        if (this.props.showButton)
            return (
                <div className="nav-button" onClick={this.onClick}>
                  {this.props.displayKeyboardShortcuts
                      ? (<p className="nav-text">Keyboard hints <span className="nav-on">ON</span></p>)
                   : (<p className="nav-text">Keyboard hints <span className="nav-off">OFF</span></p>)}
                </div>
            );
        else
            return null;
    }
}

const mapStateToProps = (state, props) => ({
    displayKeyboardShortcuts: state.displayKeyboardShortcuts
});

export default connect(mapStateToProps)(KeyboardShortcutsOnOff);
