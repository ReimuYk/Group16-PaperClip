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
        receiverName:''
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
                console.log(responseJson);
                let data = eval(responseJson);
                that.setState({
                    message: data,
                    modalShow: true,
                    receiverName: item.another
                })
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
                if(data.result == "success"){
                    tmp.push({sender:username, content:that.state.messageContent, time:data.time});
                    that.setState({
                        message:tmp,
                        messageContent: ''
                    })
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
                        title={<a>{item.another}</a>}
                        description={item.content}
                        />
                    </List.Item>
                    )}
                />
            </div>
                <Modal
                    visible={this.state.modalShow}
                    onCancel={this.handleCancel}
                    title={this.state.username}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>关闭</Button>,
                    ]}
                >
                    <div style={{paddingTop:'30px'}}>
                        <List
                            style={{textAlign:'left', height:'300px', overflowY:'scroll'}}
                            className="messageContent"
                            itemLayout="horizontal"
                            dataSource={this.state.message}
                            renderItem={item => (
                                <List.Item
                                    actions={[<p>{item.time}</p>]}
                                >
                                    <List.Item.Meta
                                        title={item.sender}
                                        description={item.content}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <TextArea rows={2} value={this.state.messageContent} onChange={this.handleMessageChange} placeholder='发送私信' />
                    <Button type="primary" onClick={this.commitMessage}>发送</Button>
                </Modal>
            </div>
        )
    }
}

export default Message;
