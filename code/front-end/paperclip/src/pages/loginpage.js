import React, { Component } from 'react';
import '../css/LoginPage.css'
import { Link, Redirect } from 'react-router-dom';
import { IPaddress } from '../App'
import {message} from 'antd'

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
    }
    login(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let that  = this;
        let jsonbody = {};
        jsonbody.password = password;
        jsonbody.username = username;
        let url = IPaddress + 'service/login';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "fail"){
                    message.error('登录错误，请验证您的用户名和密码！', 3);
                    return;
                }
                else{
                    username = result.username;
                    sessionStorage.setItem('username', username);
                    window.location.href='/user';
                    that.setState({});
                }
            }).catch(function(e){
            console.log("Oops, error");
        });
    }
    render() {
        if(sessionStorage.getItem('username') != null){
            return <Redirect to="/user"/>;
        }
        return (
            <section id='login-page'>
                <div className="SignFlowHomepage">
                    <div className="Card SignContainer-content">
                        <div className="SignContainer-inner">
                            <div className="Login-content">
                                <div novalidate className="SignFlow">
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
                                </div>
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
