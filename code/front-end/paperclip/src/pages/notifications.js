import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, Modal, Button, Input, Tabs} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import { IPaddress } from '../App'
var username = '';

const TabPane = Tabs.TabPane;
var sortData = function(x,y){
    if(x.time < y.time){
        return 1;
    }
    else if(x.time > y.time){
        return -1;
    }
    else return 0;
}
var information = {
    commentsNote: [],
    reply: [],
    comments: []
}
class Notifications extends Component{
    componentWillMount = () => {
        /* get info from server */
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/getNoteCommInfo';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                for(var i = 0; i<data.length; i++){
                    if(data[i].content.length > 30){
                        data[i].content = data[i].content.substring(0,30);
                        data[i].content += '...';
                    }
                }
                information.commentsNote = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }


    callback  = (key) => {
        if(key == "1"){
            /* get info from server */
            let that = this;
            /* get username */
            username = sessionStorage.getItem('username');
            /* get data according to username */
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/getNoteCommInfo';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    for(var i = 0; i<data.length; i++){
                        if(data[i].content.length > 30){
                            data[i].content = data[i].content.substring(0,30);
                            data[i].content += '...';
                        }
                    }
                    information.commentsNote = data;
                    that.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }
        else if(key == "2"){
            /* get info from server */
            let that = this;
            /* get username */
            username = sessionStorage.getItem('username');
            /* get data according to username */
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/getPostilCommInfo';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    for(var i = 0; i<data.length; i++){
                        if(data[i].content.length > 30){
                            data[i].content = data[i].content.substring(0,30);
                            data[i].content += '...';
                        }
                    }
                    information.comments = data;
                    that.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }
        else if(key =="3"){
            /* get info from server */
            let that = this;
            /* get username */
            username = sessionStorage.getItem('username');
            /* get data according to username */
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/getReplyInfo';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    for(var i = 0; i<data.length; i++){
                        if(data[i].content.length > 30){
                            data[i].content = data[i].content.substring(0,30);
                            data[i].content += '...';
                        }
                    }
                    information.reply = data;
                    that.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }

    }
    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
            <NavBar />
                <div style={{width: '70%', margin: 'auto', marginLeft:'15%', marginTop:'5%'}}>
                    <Tabs
                        tabPosition={"left"}
                        defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="评论笔记通知" key="1">
                            <List
                                pagination={{pageSize:10}}
                                itemLayout="horizontal"
                                dataSource={information.commentsNote}
                                renderItem={item => (
                                    <List.Item
                                        actions = {[<p>{item.time}</p>]}
                                    >
                                        <List.Item.Meta
                                            title={<a href={'/viewnote?noteID=' + item.noteID}>{item.noteTitle}</a>}
                                            description={<p><a href={'/viewpage?username=' + item.sender}>{item.sender}</a>评论了：{item.content}</p>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="评论批注通知" key="2">
                            <List
                                pagination={{pageSize:10}}
                                itemLayout="horizontal"
                                dataSource={information.comments}
                                renderItem={item => (
                                    <List.Item
                                        actions = {[<p>{item.time}</p>]}
                                    >
                                        <List.Item.Meta
                                            title={<a href={'/papaer?paperID=' + item.paperID}>{item.paperTitle}</a>}
                                            description={<p><a href={'/viewpage?username=' + item.sender}>{item.sender}</a>评论了：{item.content}</p>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                        <TabPane tab="回复通知" key="3">
                            <List
                                pagination={{pageSize:10}}
                                itemLayout="horizontal"
                                dataSource={information.reply}
                                renderItem={item => (
                                    <List.Item
                                        actions = {[<p>{item.time}</p>]}
                                    >
                                        <List.Item.Meta
                                            title={<a href={'/paper?paperID=' + item.paperID}>{item.paperTitle}</a>}
                                            description={<p><a href={'/viewpage?username=' + item.username}>{item.sender}</a>回复了：{item.content}</p>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Notifications;
