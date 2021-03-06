import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import MediaQuery from 'react-responsive';

import * as actions from '../actions';

import KeyboardShortcutsOnOff from './KeyboardShortcutsOnOff';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logOff = this.logOff.bind(this);
    }
    
    logOff() {
        this.props.dispatch(actions.logOff());
    }

    render() {
        const logInLink = Boolean(this.props.api.authToken)
                  ? (<a className="nav-text" href="javascript:void(0)" onClick={this.logOff}>Log off</a>)
              : (<Link className="nav-text" to="/log-in-or-register">Log in</Link>);


        return (
            <div className='nav-bar'>
              <div className={this.props.parent === 'Home'
                   ? "nav-button nav-button-selected" : "nav-button"}>
                <Link className="nav-text" to="/">Exercises</Link>
              </div>

              <div className={this.props.parent === 'WhatIs'
                   ? "nav-button nav-button-selected" : "nav-button"}>
                <Link className="nav-text" to="/what-is-this">What is this?</Link>
              </div>

              <MediaQuery minDeviceWidth={800}>
                {(matches) => {
                    let showHints;
                    if (this.props.displayKeyboardShortcuts === null || matches === false)
                        showHints = matches;
                    else {
                        showHints = this.props.displayKeyboardShortcuts;
                    }
                    return (<KeyboardShortcutsOnOff showButton={matches} showHints={showHints}/>);
                }}
              </MediaQuery>

              <div className={this.props.parent === 'Scores'
                   ? "nav-button nav-button-selected" : "nav-button"}>
                <Link className="nav-text" to="/scores">Scores</Link>
              </div>

              <div className={this.props.parent === 'LogIn' ? "log-in-btn nav-button nav-button-selected" : "log-in-btn nav-button"}>
                {logInLink}
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    displayKeyboardShortcuts: state.ui.displayKeyboardShortcuts,
    api: state.api,
});

export default connect(mapStateToProps)(NavBar);
