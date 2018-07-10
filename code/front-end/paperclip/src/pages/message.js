import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, Modal, Button, Input} from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
import { IPaddress } from '../App'
const { TextArea } = Input;
const userID=1;
const constUsername = 'user2'
const constUsernameSelf = 'user1'
const constData = [{
    key: 1,
    userName: 'user 1',
},{
    key: 2,
    userName: 'user 2',
},{
    key: 3,
    userName: 'user 3',
},{
    key: 4,
    userName: 'user 4',
},{
    key: 5,
    userName: 'user 5',
},{
    key: 6,
    userName: 'user 6',
},{
    key: 7,
    userName: 'user 7',
},{
    key: 8,
    userName: 'user 8',
}]

const constMessage = [{
    userName: 'user 1',
    content:'......'
},{
    userName: 'user 2',
    content:'.....'
},{
    userName: 'user 1',
    content:'......'
},{
    userName: 'user 2',
    content:'.....'
},{
    userName: 'user 1',
    content:'......'
},{
    userName: 'user 2',
    content:'.....'
},{
    userName: 'user 1',
    content:'......'
},{
    userName: 'user 2',
    content:'.....'
}]

class Message extends Component{
    state = {
        data: [],
        message: [],
        modalShow: false,
        username: '',
        messageContent: '',
        usernameSelf: ''
    }
    componentWillMount = () => {
        this.setState({
            data: constData,
            message: constMessage,
            username: constUsername,
            usernameSelf:constUsernameSelf
            }
        )
    }
    showMessage = () => {
        this.setState({
            modalShow: true
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
        var that = this;
        var tmp = this.state.message;
        tmp.push({userName: that.state.usernameSelf, content:that.state.messageContent});
        this.setState({
            message: tmp,
            messageContent: ''
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
                    <List.Item  actions={[<a onClick={this.showMessage}> 查看对话 </a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href="https://ant.design">{item.userName}</a>}
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
                    <div>
                        <List
                            style={{textAlign:'left', height:'300px', overflowY:'scroll'}}
                            className="messageContent"
                            itemLayout="horizontal"
                            dataSource={this.state.message}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar src={ uh } />}
                                        title={item.userName}
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
