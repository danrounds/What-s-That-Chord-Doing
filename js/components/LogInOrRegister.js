import React from 'react';
import {connect} from 'react-redux';

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

    onLogIn() {
        // this.props.dispatch(actions.getUserScores(this.name.value, this.password.value));
        this.props.dispatch(actions.getHighScores('easyMajor'));
        console.log('logged in');
        console.log(this.name.value);
    }

    onRegister() {
        if (!this.state.register) {
            this.setState({register: true});
        } else
            console.log('register now');
        // this.forceUpdate();
        console.log(this.props.api);
    }

    render() {
        // console.log(this.register);
        console.log(this.name);
        console.log(this.password);
        console.log(this.passwordConfirm);
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
