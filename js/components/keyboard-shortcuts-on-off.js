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
            this.props.display));
    }

    render() {
        if (this.props.display)
            return (
                <button onClick={this.onClick}>
                  {this.props.displayKeyboardShortcuts
                      ? 'Turn off keyboard shortcuts'
                  : 'Turn on keyboard shortcuts'}
                </button>
            );
        else
            return null;
    }
}

const mapStateToProps = (state, props) => ({
    displayKeyboardShortcuts: state.displayKeyboardShortcuts
});

export default connect(mapStateToProps)(KeyboardShortcutsOnOff);
