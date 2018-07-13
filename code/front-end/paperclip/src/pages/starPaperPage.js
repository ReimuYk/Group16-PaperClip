import React, { Component } from 'react';

import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'

var username ='';

class StarPaper extends Component{
    state = {
        data: [],
        username:''
    }
    componentWillMount = () => {
        username = sessionStorage.getItem('username');
        let that = this;
        /* get specific info of papers */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/starPaper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                that.setState({
                    data:data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    quitStar = (record, item) => {
        let that =this;
        /* send to server, refresh this page in get/post request */
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.paperID = item.ID;
        let url = IPaddress + 'service/quitStar/paper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result == "success"){
                    let tmpdata = that.state.data;
                    let dataLen = tmpdata.length;
                    for(let i=0; i<dataLen; i++){
                        if(tmpdata[i].ID == item.ID){
                            tmpdata.splice(i, 1);
                            break;
                        }
                    }
                    that.setState({
                        data: tmpdata,
                    })
                }
                else{
                    alert("删除错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render(){
        if(sessionStorage.getItem('username') == ''){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
                <NavBar />
                
                <UserFloatMenu />
                <div style={{width:'60%',marginLeft:'200px'}}>
                <div style={{width:'915px'}}>
                <p style={{textAlign:'left'}}>
                    <a style={{width:'100px',marginLeft:'48px'}}>论文名称/描述</a>
                    <a style={{width:'40px',marginLeft:'200px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>阅读量</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>批注量</a>
                    <a style={{wdith:'40px',marginLeft:'53px'}}>笔记量</a>
                    <a style={{wdith:'50px',marginLeft:'70px'}}>发表日期</a>
                    <a style={{wdith:'50px',marginLeft:'90px'}}>操作</a>
                </p>
                </div>
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item
                        actions={[<p> 
                            <Popconfirm title="确定取消收藏吗？" onConfirm={() => this.quitStar(this, item)}>
                                <a style={{width:'75px',marginLeft:'20px'}}>取消收藏</a>
                            </Popconfirm>
                        </p>]}>
                        <List.Item.Meta
                        /* 论文显示页 */
                        title={<a href={"/paper?ID="+item.ID}>{item.title}</a>}
                        description={item.keywords}
                        />
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.author}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.readno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.commentno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.noteno}</a>
                        <a style={{width:'80px',marginLeft:'0px'}}>{item.date}</a>
                    </List.Item>
                    )}
                />
                </div>
            </div>
        )
    }
}

export default StarPaper;
