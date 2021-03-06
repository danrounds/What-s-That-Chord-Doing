import React from 'react';
import {connect} from 'react-redux';
import {Router, Redirect, hashHistory} from 'react-router';

import NavBar from './NavBar';
import * as actions from '../actions';

export class LogInOrRegister extends React.Component {
    // Log-in/Registration "page" endpoint. /log-in-or-register endpoint
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            statusText: '',
            errorText: false,
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.onLogIn = this.onLogIn.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    componentDidMount() {
        this.props.instrument.then(piano => piano.stop());
    }

    componentWillReceiveProps(nextProps) {
        // Everything below pertains to our status text:
        if (nextProps.api.pending) {
            if (this.state.register)
                this.setState({ statusText: 'Registering...', errorText: false });
            else
                this.setState({ statusText: 'Checking...', errorText: false });

        } else if (nextProps.api.error !== this.props.api.error) {
            this.setState({ errorText: true });

            const errorCode = nextProps.api.error;
            // Log-in errors:
            if (errorCode === 404)
                this.setState({ statusText: 'Username doesn\'t exist' });
            else if (errorCode === 401)
                this.setState({ statusText: 'Invalid password' });

            // Registration errors:
            else if (errorCode === 409)
                this.setState({ statusText: 'Username already exists; try a new one' });
            else if (errorCode === 422)
                this.setState({ statusText: 'Try a different username' });
            else if (errorCode)
                this.setState({ statusText: 'Submit failed; try again' });
        }
    }

    getButtonStyle(type) {
        if (this.state.register) {
            if (type === 'reg') {
                return { color: '#333', border: '1px solid green' };
            }
        } else if (type === 'log') {
            return { color: '#333', border: '1px solid green' };
        }
        return { color: 'gray' };
    }

    handleEnter(e) {
        if (e.key === 'Enter') {
            if (this.state.register)
                return this.onRegister(e);
            return this.onLogIn(e);
        }
    }

    logInStyle() {
        return this.state.errorText ? 'log-in-status log-in-err' : 'log-in-status';
    }

    onLogIn(e) {
        e.preventDefault();
        this.setState({ errorText: true });

        const [name, password] = [this.name.value.trim(), this.password.value.trim()];

        if (!this.name.value.trim())
            this.setState({ statusText: 'Please enter a username'});
        else if (!this.password.value.trim())
            this.setState({ statusText: 'Please enter a password'});

        if (this.state.register) {
            this.setState({ register: false });
        }
        if (this.name.value && this.password.value)
            this.props.dispatch(actions.logIn(this.name.value, this.password.value));
        return false;           // Keeps page from refreshing
    }

    onRegister(e) {
        e.preventDefault();
        this.setState({ errorText: true });

        if (!this.state.register) {
            this.setState({ register: true, statusText: '' });
        } else {
            try {
                const name = this.name.value, pw = this.password.value,
                      pw_ = this.passwordConfirm.value;

                const matchingRegEx = /[a-zA-Z0-9_]+/.exec(name) || [];
                if (matchingRegEx[0] !== name) {
                    this.setState({ statusText: 'Username should be letters, numbers, and underscores' });
                } else if (name && pw === pw_) {
                    if (pw.length < 6)
                        this.setState({ statusText: 'Please choose a password of at least six characters'});
                    else if (pw.includes(' ') || pw.includes('\t') || pw.includes('\n'))
                        this.setState({ statusText: 'Password shouldn\'t contain whitespace characters'});
                    else
                        this.props.dispatch(actions.makeUserAccount(name, pw));
                } else if (!pw || !pw_) {
                    this.setState({ statusText: 'Fill in both password fields'});
                } else if (pw !== pw_)
                    this.setState({ statusText: 'Passwords don\'t match'});
            } catch(e) {;}      // Swallow .reference for undefined
        }
        return false;           // Keeps page from refreshing
    }

    render() {
        if (this.props.api.authToken) {
            return (
                <Router history={hashHistory}>
                  <Redirect from="log-in-or-register" to="/" />
                </Router>
            );
        }
        
        return (
            <div onKeyDown={this.handleEnter}>
              <NavBar parent="LogIn"/>             
              <div className={this.logInStyle()}>{this.state.statusText}</div>
              <form action="javascript:void(0)" className="log-in-and-registration-form">
                <label>
                  Name<br/>
                  <input ref={el => { this.name = el; }}
                    type="text" autoFocus required /><br/>
                </label>
                <label>
                  Password<br/>
                  <input className="log-in-input" ref={el => { this.password = el; }}
                    type="password" required /><br/>
                </label>

                {this.state.register &&
                    (<label>Confirm password<br/>
                      <input ref={el => { this.passwordConfirm = el; }}
                            type="password" required /><br/>
                     </label>)
                }

                <button style={this.getButtonStyle('log')} onClick={this.onLogIn}>Log in</button>
                <button style={this.getButtonStyle('reg')} onClick={this.onRegister}>Register</button>
              </form>

            </div>
        );
    }
}

export default connect((state) => ({ api: state.api, }))(LogInOrRegister);
