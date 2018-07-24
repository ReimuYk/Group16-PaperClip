import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, message } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */

var username ='';

class Invitations extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.type = "big";
        let url = IPaddress + 'service/getInvitations';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                that.setState({
                    data: data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    acceptInvitation = (record, item) =>{
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        let invitations = that.state.data;
        jsonbody.inviteID = item.inviteID;
        jsonbody.reply = 1;
        let url = IPaddress + 'service/replyInvitation';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                if(data.result == "fail"){
                    message.error('操作失败，请重试', 3);
                    return;
                }
                for(var i=0; i<invitations.length; i++){
                    if(invitations[i].inviteID == item.inviteID){
                        invitations.splice(i,1);
                        break;
                    }
                }
                that.setState({
                    data: invitations
                })
                message.success('已接受请求', 3);
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    refuseInvitation = (record, item) =>{
        let that = this;
        /* get data according to username */
        let invitations = that.state.data;
        let jsonbody = {};
        jsonbody.inviteID = item.inviteID;
        jsonbody.reply = 0;
        let url = IPaddress + 'service/replyInvitation';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                if(data.result == "fail"){
                    message.error('操作失败，请重试', 3);
                    return;
                }
                for(var i=0; i<invitations.length; i++){
                    if(invitations[i].inviteID == item.inviteID){
                        invitations.splice(i,1);
                        break;
                    }
                }
                that.setState({
                    data: invitations
                })
                message.success('已拒绝请求', 3);
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
            <NavBar />
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px', paddingTop:'40px'}}>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item actions={[<p><a onClick={() => this.acceptInvitation(this, item)}>接受</a><a onClick={() => this.refuseInvitation(this, item)}>拒绝</a></p>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ item.avatar } />}
                        title={<Link to={"/viewpage?username=" + item.sender}>{item.sender}</Link>}
                        description={<p>邀请您协作文档： {item.title} </p>}
                        />
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default Invitations;
