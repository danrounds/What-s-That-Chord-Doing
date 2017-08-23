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
        };
        this.onLogIn = this.onLogIn.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props.api.error);
    }

    onLogIn() {
        this.props.dispatch(actions.getUserScores(this.name.value, this.password.value));
    }

    onRegister() {
        if (!this.state.register) {
            this.setState({register: true});
        } else
            console.log('register now');
    }

    render() {
        // console.log(this.register);
        console.log(this.name);
        console.log(this.password);
        console.log(this.passwordConfirm);

        console.log(this.props);

        if (this.props.api.userScores.name) {
            return (
                <Router history={hashHistory}>
                  <Redirect from="log-in-or-register" to="/" />
                </Router>
            );
        }

        return (
            <div>
              <NavBar/>

              <form>
                <label>
                  Name:<br/>
                  <input ref={el => { this.name = el; }}
                    type="text" autoFocus required /><br/>
                </label>
                <label>
                  Password:<br/>
                  <input ref={el => { this.password = el; }}
                    type="password" required /><br/>
                </label>

                {this.state.register ?
                    (<label>Confirm password:<br/>
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
