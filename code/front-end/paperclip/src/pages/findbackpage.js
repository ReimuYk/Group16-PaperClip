import React, { Component } from 'react';
import '../css/findbackpage.css'
import { IPaddress } from '../App'
import  { Redirect } from 'react-router-dom'

class Findback extends Component {
    constructor(props){
        super(props);
        this.isEmailAvailable = this.isEmailAvailable.bind(this);
        this.checkFindback = this.checkFindback.bind(this);
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
    checkFindback(){
        var email = document.getElementById("email").value;
        if(!this.isEmailAvailable(email)){
            alert("邮箱错误！");
            return false;
        }
        let that  = this;
        let jsonbody = {};
        jsonbody.userEmail = email;
        let url = IPaddress + 'service/findPassword';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('('+responseJson+')');
                if(data.result=="fail"){
                    alert("请求失败，请重试或检查您的注册邮箱是否正确");
                }
                else{
                    alert("请检查您的注册邮箱");
                }
            }
            ).catch(function(e){
            console.log("Oops, error");
        });
        return true;
    }
    render() {
        if(sessionStorage.getItem('username') != ''){
            return <Redirect to="/user"/>;
        }
        return (
            <section id='login-page'>
                <div class="Step-inner PasswordReset">
                    <form novalidate="" class="PasswordReset-step">
                        <div class="StepHeader">
                            <h1 class="StepHeader-title">找回密码</h1>
                            <h2 class="StepHeader-subtitle">验证码将会发送至你的注册邮箱</h2>
                        </div>
                        <div class="SignFlow-account">
                            <div class="SignFlow-supportedCountriesSelectContainer"></div>
                            <div class="SignFlowInput SignFlow-accountInputContainer">
                                <div class="SignFlow-accountInput Input-wrapper">
                                    <input type="text" id="email" name="email" class="Input" placeholder="邮箱"></input>
                                </div>
                            </div>
                        </div>
                        <button type="submit" onClick={this.checkFindback} class="Button PasswordReset-nextStep Button--primary Button--blue">下一步</button>
                    </form>
                </div>
            </section>
        );
    }
}

export default Findback;