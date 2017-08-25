import React from 'react';
import {connect} from 'react-redux';
import {Router, Redirect, hashHistory} from 'react-router';

import NavBar from './NavBar';
import * as actions from '../actions';

export class LogInOrRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            statusText: '',
        };
        this.onLogIn = this.onLogIn.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    onLogIn() {
        this.setState({ register: false });
        this.props.dispatch(actions.getUserScores(this.name.value, this.password.value));
        return false;           // Keeps page from refreshing
    }

    onRegister() {
        if (!this.state.register) {
            this.setState({ register: true, statusText: '' });
        } else {
            try {
                const name = this.name.value, pw = this.password.value,
                      pw_ = this.passwordConfirm.value;

                if (name && pw === pw_) {
                    const matchingRegEx = /[a-zA-Z0-9_]+/.exec(name) || [];
                    if (matchingRegEx[0] !== name)
                        this.setState({ statusText: 'Username should be letters, numbers, and underscores' });
                    else if (pw.length < 6)
                        this.setState({ statusText: 'Please choose a password of at least six characters'});
                    else
                        this.props.dispatch(actions.makeUserAccount(name, pw));
                } else if (pw !== pw_)
                    this.setState({ statusText: 'Passwords don\'t match'});
            } catch(e) {;;;;}
        }
        return false;           // Keeps page from refreshing
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.api.error !== this.props.api.error) {
            if (nextProps.api.error === 401)
                this.setState({ statusText: 'Invalid password or username' });
            else if (nextProps.api.error === 409)
                this.setState({ statusText: 'Username already exists; try a new one' });
            else if (nextProps.api.error)            
                this.setState({ statusText: 'Submit failed; try again' });
        }
    }

    render() {
        if (this.props.api.userScores.name) {
            return (
                <Router history={hashHistory}>
                  <Redirect from="log-in-or-register" to="/" />
                </Router>
            );
        }

        return (
            <div>
              <NavBar parent="LogIn"/>

              <div className="log-in-status">{this.state.statusText}</div>

              <form className="log-in-and-registration-form">
                <label>
                  Name<br/>
                  <input ref={el => { this.name = el; }}
                    type="text" autoFocus required /><br/>
                </label>
                <label>
                  Password<br/>
                  <input ref={el => { this.password = el; }}
                    type="password" required /><br/>
                </label>

                {this.state.register ?
                    (<label>Confirm password<br/>
                      <input ref={el => { this.passwordConfirm = el; }}
                            type="password" required /><br/>
                     </label>)
                 : null}

                <button onClick={this.onLogIn}>Log in</button>
                <button onClick={this.onRegister}>Register</button>
              </form>

            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    api: state.api,
});

export default connect(mapStateToProps)(LogInOrRegister);
