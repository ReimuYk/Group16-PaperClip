import React, { Component } from 'react';

import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import username from './loginpage';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
import book1 from '../statics/book1.jpg';
const userID=1;
const papers = [{
    ID: 1,
    cover: book1,
    title: 'paper 1',
    author: 'author 1',
    readno: 111,
    commentno: 11,
    noteno: 1,
    date: '2018-06-01',
    discription: 'discription of paper 1',
},{
    ID: 2,
    cover: book1,
    title: 'paper 2',
    author: 'author 2',
    readno: 222,
    commentno: 22,
    noteno: 2,
    date: '2018-06-01',
    discription: 'discription of paper 2',
},{
    ID: 3,
    cover: book1,
    title: 'paper 3',
    author: 'author 3',
    readno: 333,
    commentno: 33,
    noteno: 3,
    date: '2018-06-01',
    discription: 'discription of paper 3',
},{
    ID: 4,
    cover: book1,
    title: 'paper 4',
    author: 'author 4',
    readno: 444,
    commentno: 44,
    noteno: 4,
    date: '2018-06-01',
    discription: 'discription of paper 4',
},{
    ID: 5,
    cover: book1,
    title: 'paper 5',
    author: 'author 5',
    readno: 555,
    commentno: 55,
    noteno: 5,
    date: '2018-06-01',
    discription: 'discription of paper 5',
},{
    ID: 6,
    cover: book1,
    title: 'paper 6',
    author: 'author 6',
    readno: 666,
    commentno: 66,
    noteno: 6,
    date: '2018-06-01',
    discription: 'discription of paper 6',
},{
    ID: 7,
    cover: book1,
    title: 'paper 7',
    author: 'author 7',
    readno: 777,
    commentno: 77,
    noteno: 7,
    date: '2018-06-01',
    discription: 'discription of paper 7',
},{
    ID: 8,
    cover: book1,
    title: 'paper 8',
    author: 'author 8',
    readno: 888,
    commentno: 88,
    noteno: 8,
    date: '2018-06-01',
    discription: 'discription of paper 8',
}]

class StarPaper extends Component{
    state = {
        data: [],
        username:''
    }
    componentWillMount = () => {
        this.setState({
            username: username
        })
        let that = this;
        /* get specific info of papers */
        let jsonbody = {};
        jsonbody.username = this.state.username;
        let url = IPaddress + 'service/starPaper';
        console.log(url);
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                console.log(1);
                let data = eval(responseJson);
                console.log(data)
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
        jsonbody.username = this.state.username;
        jsonbody.paperID = item.ID;
        let url = IPaddress + 'service/quitStar/paper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
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
