import React, { Component } from 'react';
import '../css/LoginPage.css'
import { Link, Redirect } from 'react-router-dom';

export var log = false;

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.state={
            isLog:false
        }
    }
    login(){
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        alert(username);
        alert(password);
        this.setState({isLog:true}); 

        log = true;
    }
    render() {
        if(this.state.isLog){
            return <Redirect to="/"/>;
        }
        return (
            <section id='login-page'>
                <div class="SignFlowHomepage">
                    <div class="Card SignContainer-content">
                        <div class="SignContainer-inner">
                            <div class="Login-content">
                                <form novalidate class="SignFlow">
                                    <div class="SignFlow-account">
                                        <div class="SignFlowInput SignFlow-accountInputContainer">
                                            <div class="SignFlow-accountInput Input-wrapper">
                                                <input type="text" id="username" name="username" class="Input" placeholder="用户名或邮箱"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="SignFlow-password">
                                        <div class="SignFlowInput">
                                            <div class="Input-wrapper">
                                                <input type="password" id="password" name="password" class="Input" placeholder="密码"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="Login-options">
                                        <button type="button" class="Button Login-cannotLogin Button--plain"><Link to="/findback">忘记密码？</Link></button>
                                    </div>
                                    <button type="submit" onClick={this.login} class="Button SignFlow-submitButton Button--primary Button--blue">登录</button>
                                </form>
                            </div>
                            <div class="SignContainer-switch">没有帐号？
                                <span><Link to="/register">注册</Link></span></div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}

export default Login;
