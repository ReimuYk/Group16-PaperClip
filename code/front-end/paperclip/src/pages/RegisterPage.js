import React, { Component } from 'react';
import '../css/LoginPage.css'
import { Link,Redirect } from 'react-router-dom';
import { IPaddress } from '../App'
class RegisterPage extends Component {
    constructor(props){
        super(props);
        this.isEmailAvailable = this.isEmailAvailable.bind(this);
        this.checkRegister = this.checkRegister.bind(this);
    }
    isEmailAvailable(str){
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(!reg.test(str)){
            return false;
        }
        else{
            return true;
        }
    }
    checkRegister(){
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        if(!this.isEmailAvailable(email)){
            alert("邮箱错误！");
            return false;
        }
        let that  = this;
        let jsonbody = {};
        jsonbody.email = email;
        jsonbody.password = password;
        jsonbody.username = username;
        let url = IPaddress + 'service/register';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == 'duplicate username'){
                    alert('重复的用户名，请重试');
                    return false;
                }
                if(result.result == 'duplicate email'){
                    alert('该邮箱已被注册过，可直接使用邮箱登录');
                    return false;
                }
                else{
                    alert('注册成功，请检查您的邮箱');
                }
            }).catch(function(e){
            console.log("Oops, error");
        });
        return true;
    }
    render() {
        if(sessionStorage.getItem('username') != null){
            return <Redirect to="/user"/>;
        }
        return (
            <section id='register-page'>
                <div class="SignFlowHomepage">
                    <div class="Card SignContainer-content">
                        <div class="SignContainer-inner">
                            <div class="Login-content">
                                <form novalidate class="SignFlow">
                                    <div class="SignFlow-email">
                                        <div class="SignFlowInput">
                                            <div class="Input-wrapper">
                                                <input type="email" id="email" name="email" class="Input" placeholder="邮箱"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="SignFlow-account">
                                        <div class="SignFlowInput SignFlow-accountInputContainer">
                                            <div class="SignFlow-accountInput Input-wrapper">
                                                <input type="text" id="username" name="username" class="Input" placeholder="用户名"></input>
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
                                    <button type="submit" onClick={this.checkRegister} class="Button SignFlow-submitButton Button--primary Button--blue">注册</button>
                                </form>
                            </div>
                            <div class="SignContainer-switch">已有帐号？
                                <span><Link to="/login">登录</Link></span></div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}

export default RegisterPage;