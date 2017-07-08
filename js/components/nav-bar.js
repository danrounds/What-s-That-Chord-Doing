import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import MediaQuery from 'react-responsive';

import KeyboardShortcutsOnOff from './keyboard-shortcuts-on-off';

export class NavBar extends React.Component {
    render() {
        return (
            <div className='nav-bar'>
              <div className={this.props.parent === 'Home'
                   ? "nav-button" : "nav-button nav-button-invisible"}>
                <Link className="nav-text" to="/">Exercises</Link>
              </div>

              <MediaQuery minDeviceWidth={800}>
                {(matches) => {
                    let showHints;
                    if (this.props.displayKeyboardShortcuts === undefined || this.props.displayKeyboardShortcuts === null)
                        showHints = matches;
                    else
                        showHints = this.props.displayKeyboardShortcuts;
                    return (<KeyboardShortcutsOnOff showButton={matches} showHints={showHints}/>);
                }}
              </MediaQuery>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    displayKeyboardShortcuts: state.displayKeyboardShortcuts
});

export default connect(mapStateToProps)(NavBar);
