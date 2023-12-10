import React, {Component, Fragment} from 'react'
import api from '../../api'
import "./Login.css";
import {saveTokenToCookie} from "../../cookies/cookies";


class Login extends Component {
    _regex = RegExp('^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$');

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            isEmailValid: false,
            isPasswordValid: false,
            errorMessage: "",
        }
        this.onEmailChanged = this.onEmailChanged.bind(this);
        this.onPasswordChanged = this.onPasswordChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginWithGoogle = this.handleLoginWithGoogle.bind(this);
    }

    onEmailChanged(e) {
        let value = e.target.value;
        let isValid = this.validateEmail(value);
        this.setState({email: value, isEmailValid: isValid});
    }

    onPasswordChanged(e) {
        let value = e.target.value;
        let isValid = this.validatePassword(value);
        this.setState({password: value, isPasswordValid: isValid});
    }

    validateEmail(email) {
        return this._regex.test(email);
    }

    validatePassword(password) {
        return password.length > 6;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.isEmailValid === true && this.state.isPasswordValid === true) {
            let email = this.state.email;
            let password = this.state.password;
            api.login({'email': email, 'password': password}).then(
                (result) => {
                    console.log('good');
                    console.log(result);
                    this.setState({errorMessage: ""});
                    saveTokenToCookie(result.data.token);
                    console.log(result.data.token);
                    window.location.href = "/";
                }
            ).catch((e) => {
                console.log('bad');
                console.log(e);
                this.setState({errorMessage: "Invalid username of password"});
            });
        }
    }

    async handleLoginWithGoogle() {
        // cookies.set("authenticated_with_google", true, {
        //     path: "/",
        // });
        window.location.href = 'http://localhost:3000/auth/google';

    };

    render() {
        let errorMessage = this.state.errorMessage;
        let errorMessageClass = this.state.errorMessage === "" ? "invisible" : "error-message";
        let emailColor = this.state.isEmailValid === true ? "green" : "red";
        let passwordColor = this.state.isPasswordValid === true ? "green" : "red";

        let submitButtonClass = this.state.isEmailValid && this.state.isPasswordValid ? "active-submit" : "inactive-submit";

        return (
            <Fragment>
                <form className="form" id="login-form" onSubmit={this.handleSubmit}>
                    <h4 className={errorMessageClass}>{errorMessage}</h4>
                    <label className="label"> Email:<br/>
                        <input className="input" name="email-input" required={true} type="text" value={this.state.email}
                               onChange={this.onEmailChanged} style={{borderColor: emailColor}}/>
                    </label><br/>
                    <label className="label">Password:<br/>
                        <input className="input" name="password-input" required={true} type="password"
                               value={this.state.password}
                               onChange={this.onPasswordChanged} style={{borderColor: passwordColor}}/>
                    </label><br/>
                    <input disabled={!this.state.isEmailValid || !this.state.isPasswordValid}
                           className={"input " + `${submitButtonClass}`} type="submit" value="Login"/>
                    <button className="input" onClick={this.handleLoginWithGoogle}>Login with Google</button>
                </form>
            </Fragment>
        );
    }
}

export default Login