import React, { Component } from 'react';
import logo from '.././logo.svg';
import { Input,Icon, Avatar, Select,Menu, Dropdown, Popover,List, Button, message } from 'antd';
import { Row, Col } from 'antd';
import { Anchor } from 'antd';
import { Tabs } from 'antd';
import { IPaddress } from '../App'

import {Link} from 'react-router-dom';


var username = '';
var information = {
    unreadMessage:[],
    followMessage:[],
    inviteMessage:[]
}

const Search = Input.Search;
const TabPane = Tabs.TabPane

class NavBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLog:false,
            searchIdx:"empty"
        }
    }

    logout = () =>{
        sessionStorage.removeItem('username');
        window.location.reload();
    }

    getUnreadMessage = () =>{
        /* get info from server */
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/user/unreadMessage';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                console.log(responseJson);
                let data = eval(responseJson);
                information.unreadMessage = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    followMessage = () =>{
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/recentFans';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                information.followMessage = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    inviteMessage = () =>{
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.type = "small";
        let url = IPaddress + 'service/getInvitations';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                console.log(data);
                information.inviteMessage = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    acceptInvitation = (record, item) =>{
        let that = this;
        /* get data according to username */
        let jsonbody = {};
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
                    message.error('操作失败，请重试');
                }
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    refuseInvitation = (record, item) =>{
        let that = this;
        /* get data according to username */
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
                    message.error('操作失败，请重试');
                }
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    renderInfo(){
        const data1=[
            "一个桃子",
            "两只羊"
        ]
        return(
        <Tabs defaultActiveKey="1">
            <TabPane tab={<Icon onClick={this.followMessage} type="smile-o" />} key="1">
            <List
                size="small"
                header={<div>这些人最近关注了你</div>}
                footer={<Link to="/user/userfans"><Button type="primary">查看全部粉丝</Button></Link>}
                dataSource={information.followMessage}
                renderItem={item => (<List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.userheader}/>}
                    title={<a href={"/viewpage?username=" + item.username}>{item.username}</a>}
                    />
                  </List.Item>)}
            />
            </TabPane>
            <TabPane tab={<Icon type="bulb" />} key="2">
            <List
                size="small"
                header={<div>评论/回复</div>}
                footer={<div>Footer</div>}
                dataSource={data1}
                renderItem={item => (<List.Item>{item}</List.Item>)}
            />
            </TabPane>
            <TabPane tab={<Icon onClick={this.inviteMessage} type="usergroup-add" />} key="3">
                <List
                    size="small"
                    header={<div>最近的邀请请求</div>}
                    footer={<Link to="/user/invitations"><Button type="primary">查看全部邀请</Button></Link>}
                    dataSource={information.inviteMessage}
                    renderItem={item => (
                        <List.Item actions={[<a onClick={() => this.acceptInvitation(this, item)}>接受</a>,<a onClick={() => this.refuseInvitation(this, item)}>拒绝</a>]}>
                            <List.Item.Meta
                                title={<Link to={"/viewpage?username=" + item.sender}>{item.sender}</Link>}
                                description={<p>邀请您协作文档：{item.title} </p>}
                            >
                                </List.Item.Meta>
                        </List.Item>
                    )}
                />
            </TabPane>
        </Tabs>
      );
    }
    renderMessage(){
        return(
        <div className="message">
            <List
                itemLayout="horizontal"
                dataSource={information.unreadMessage}
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
            <Link to="/user/message"><Button type="primary">查看全部私信</Button></Link>
        </div>
            );
    }

    render() {

        const search = (
                <Search
                placeholder="input search text"
                onChange={this.changeSearchIdx}
                onSearch={value => window.location.href = '/search?content=' + value}
                />
        )
        const menu = (
            <Menu>
              <Menu.Item key="0">
                <Link to="/user"><Icon type="home" />我的主页</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/user/setting"><Icon type="setting" />设置</Link>
              </Menu.Item>
              <Menu.Item key="3" onClick={this.logout}><Icon type="poweroff" />退出</Menu.Item>
            </Menu>
          );
        const message = this.renderMessage();
        const info = this.renderInfo();
        if(sessionStorage.getItem('username') != null){
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={3}>
                            <Link to="/home"><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Link>
                        </Col>
                        <Col span={1}><Link to='/home'>首页</Link></Col>
                        <Col span={1}><Link to='/discover'>发现</Link></Col>
                        <Col span={8} offset={1}>{search}</Col>
                        <Col span={1} offset={4}>
                            <Popover placement="bottom" title="我的消息" content={info} trigger="click">
                                <Icon type="bell" style={{ fontSize: 19, color: '#08c' }}/>
                            </Popover>
                        </Col>
                        <Col span={1}>
                            <Popover placement="bottom" title="我的私信" content={message} trigger="click">
                                <Icon onClick={this.getUnreadMessage} type="message" style={{ fontSize: 19, color: '#08c' }}/>
                            </Popover>
                        </Col>
                        <Col span={1}>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                            </Dropdown>
                        </Col>
                        
                    </Row>
                </Anchor>
            )
        }
        else{
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={3}><Link to="/home"><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Link></Col>
                        <Col span={1}><Link to='/home'>首页</Link></Col>
                        <Col span={1}><Link to='/discover'>发现</Link></Col>
                        <Col span={8} offset={1}>{search}</Col>                        
                        <Col span={1} offset={4}><Avatar icon="user" /></Col>
                        <Col span={1}><Link to="/login">Log in</Link></Col>
                    </Row>
                </Anchor>
            )
        }
    }
}

export default NavBar;