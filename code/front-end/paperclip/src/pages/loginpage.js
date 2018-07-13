import React, { Component } from 'react';
import '../css/LoginPage.css'
import { Link, Redirect } from 'react-router-dom';
import { IPaddress } from '../App'
export var log = false;
export var username = 'username';
export var password = '0';

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(){
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        //alert(username);
        //alert(password);
        sessionStorage.setItem('username', username);
    }
    render() {
        if(sessionStorage.getItem('username') != ''){
            return <Redirect to="/user"/>;
        }
        return (
            <section id='login-page'>
                <div className="SignFlowHomepage">
                    <div className="Card SignContainer-content">
                        <div className="SignContainer-inner">
                            <div className="Login-content">
                                <form novalidate className="SignFlow">
                                    <div className="SignFlow-account">
                                        <div className="SignFlowInput SignFlow-accountInputContainer">
                                            <div className="SignFlow-accountInput Input-wrapper">
                                                <input type="text" id="username" name="username" className="Input" placeholder="用户名或邮箱"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="SignFlow-password">
                                        <div className="SignFlowInput">
                                            <div className="Input-wrapper">
                                                <input type="password" id="password" name="password" className="Input" placeholder="密码"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Login-options">
                                        <button type="button" className="Button Login-cannotLogin Button--plain"><Link to="/findback">忘记密码？</Link></button>
                                    </div>
                                    <button type="submit" onClick={this.login} className="Button SignFlow-submitButton Button--primary Button--blue">登录</button>
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
