import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, Modal, Button, Input, message} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import { IPaddress } from '../App'
var username = '';
var avatar = '';
const { TextArea } = Input;

var sortData = function(x,y){
    if(x.time < y.time){
        return 1;
    }
    else if(x.time > y.time){
        return -1;
    }
    else return 0;
}
class Message extends Component{
    state = {
        data: [],
        message: [],
        modalShow: false,
        messageContent: '',
        receiverName:'',
    }
    componentWillMount = () => {
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        /* get info from server */
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/user/messageList';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                let data = result.message;
                avatar = result.avatar;
                for(var i = 0; i<data.length; i++){
                    if(data[i].content.length > 30){
                        data[i].content = data[i].content.substring(0,30);
                        data[i].content += '...';
                    }
                }
                that.setState({
                    data: data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    showMessage = (record, item) => {
        let that = this;
        /* get username */
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = item.another;
        let url = IPaddress + 'service/user/messageDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                that.setState({
                    message: data,
                    modalShow: true,
                    receiverName: item.another,
                })
                var messageDOM = document.getElementById('message');
                messageDOM.scrollTop = messageDOM.scrollHeight;
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleCancel = () => {
        this.setState({
            modalShow: false,
            messageContent:''
        })
    }
    handleMessageChange = (event) => {
        this.setState({ messageContent: event.target.value });
        /* send to server, server => that user */
    }
    calculateIdx (username){
        for(var i=0;i<this.state.data.length; ++i){
            if(this.state.data[i].another == username){
                return i;
            }
        }
        return -1;
    }
    commitMessage = () => {
        if(this.state.messageContent == ''){
            message.error('输入内容不能为空！');
            return;
        }
        let that  = this;
        var tmp = this.state.message;
        let data = this.state.data;
        let index = this.calculateIdx(this.state.receiverName);
        let jsonbody = {};
        jsonbody.senderName = username;
        jsonbody.receiverName = that.state.receiverName;
        jsonbody.content = that.state.messageContent;
        var url = IPaddress + 'service/sendMessage';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result != "fail"){
                    if(index > -1){
                        let content = that.state.messageContent;
                        if(content.length > 30){
                            data[index].content = content.substring(0,30);
                            data[index].content += '...';
                        }
                        else{
                            data[index].content = content;
                        }
                        data[index].time = result.time;
                        data.sort(sortData);
                    }
                    let message = that.state.message;
                    message.push({avatar:avatar, sender:username, content: that.state.messageContent, time:result.time})
                    that.setState({
                        message:message,
                        messageContent: '',
                        data: data
                    })
                    var messageDOM = document.getElementById('message');
                    messageDOM.scrollTop = messageDOM.scrollHeight;
                }
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
            <div style={{width:'60%',marginLeft:'200px'}}>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item  actions={[<p>{item.time}<a style={{marginLeft:'20px'}} onClick={() => this.showMessage(this, item)}> 查看对话 </a></p>]}>
                        <List.Item.Meta
                            avatar = {<Avatar src={item.avatar} />}
                            title={<a onClick = {() => this.showMessage(this,item)}>{item.another}</a>}
                            description={item.content}
                        />
                    </List.Item>
                    )}
                />
            </div>
                <Modal
                    visible={this.state.modalShow}
                    onCancel={this.handleCancel}
                    onOK={this.commitMessage}
                    title={<p>和 <a href={"/viewpage?username=" + this.state.receiverName}>{this.state.receiverName}</a> 的对话</p>}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                        <Button type="primary" onClick={this.commitMessage}>发送</Button>
                    ]}
                >
                    <div>
                        <List
                            id = 'message'
                            style={{textAlign:'left', height:'300px', overflowY:'scroll'}}
                            className="messageContent"
                            itemLayout="horizontal"
                            dataSource={this.state.message}
                            renderItem={item => (
                                <List.Item
                                    actions={[<p>{item.time}</p>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={'/viewpage?username=' + item.sender}>{item.sender}</a>}
                                        description={item.content}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <TextArea rows={2} value={this.state.messageContent} onChange={this.handleMessageChange} placeholder='发送私信' />
                </Modal>
            </div>
        )
    }
}

export default Message;
