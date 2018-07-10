import React, { Component } from 'react';

import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import username from './loginpage';
import UserFloatMenu from '../components/userFloatMenu';

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
    }
    componentWillMount = () => {
        this.setState({
            data: papers,
        })
        /* get specific info of papers */
    }
    quitStar = (record, item) => {
        var that = this;
        var tmpdata = that.state.data;
        var dataLen = tmpdata.length;
        for(let i=0; i<dataLen; i++){
            if(tmpdata[i].ID == item.ID){
                tmpdata.splice(i, 1);
                break;
            }
        }
        console.log('want to quit star paper: id(ID): ', item.ID-1);
        that.setState({
            data: tmpdata,
        })
        /* send to server, refresh this page in get/post request */
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
                        avatar={<Avatar src={item.cover} />}
                        /* 论文显示页 */
                        title={<a href={"/paper?ID="+item.ID}>{item.title}</a>}
                        description={item.discription}
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
