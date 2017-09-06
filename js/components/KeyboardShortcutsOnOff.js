import React from 'react';
import {connect} from 'react-redux';

import * as actions from  '../actions';

export class KeyboardShortcutsOnOff extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(actions.toggleKeyboardShortcutDisplay(
            this.props.showHints));
    }

    onClick() {
        this.props.dispatch(actions.toggleKeyboardShortcutDisplay(
            !this.props.displayKeyboardShortcuts));
    }

    render() {
        if (this.props.showButton)
            return (
                <div className="nav-button" onClick={this.onClick}>
                  {this.props.displayKeyboardShortcuts
                      ? (<p className="nav-text-keybrd">Keyboard <br/>hints <span className="nav-on">ON</span></p>)
                   : (<p className="nav-text-keybrd">Keyboard <br/>hints <span className="nav-off">OFF</span></p>)}
                </div>
            );
        else
            return null;
    }
}

const mapStateToProps = (state) => ({
    displayKeyboardShortcuts: state.game.displayKeyboardShortcuts
});

export default connect(mapStateToProps)(KeyboardShortcutsOnOff);
