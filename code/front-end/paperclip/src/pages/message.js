import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, Modal, Button, Input} from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import { IPaddress } from '../App'
var username = '';
const { TextArea } = Input;

class Message extends Component{
    state = {
        data: [],
        message: [],
        modalShow: false,
        messageContent: '',
        receiverName:'',
    }
    componentWillMount = () => {
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
                console.log(responseJson);
                let data = eval(responseJson);
                that.setState({
                    data: data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    showMessage = (record, item, e) => {
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
                console.log(responseJson);
                let data = eval(responseJson);
                that.setState({
                    message: data,
                    modalShow: true,
                    receiverName: item.another
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
    commitMessage = () => {
        let that  = this;
        var tmp = this.state.message;
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
                console.log(responseJson);
                let data = eval('(' + responseJson + ')');
                if(data.result != "fail"){
                    tmp.push({sender:username, content:that.state.messageContent, time:data.time});
                    console.log(tmp);
                    that.setState({
                        message:tmp,
                        messageContent: ''
                    })
                    var messageDOM = document.getElementById('message');
                    messageDOM.scrollTop = messageDOM.scrollHeight;
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    render(){
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
                    title={this.state.username}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                        <Button type="primary" onClick={this.commitMessage}>发送</Button>
                    ]}
                >
                    <div style={{paddingTop:'30px'}}>
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
