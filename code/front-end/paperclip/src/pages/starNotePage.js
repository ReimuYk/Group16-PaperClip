import React, { Component } from 'react';
import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
/* should get from server */
import book1 from '../statics/book1.jpg';
// const userID=1;
import username from './loginpage';
const notes = [{
    ID: 1,
    cover: book1,
    title: 'note 1',
    author: 'author 1',
    readno: 111,
    starno: 1,
    date: '2018-05-01',
    discription: 'discription of note 1',
},{
    ID: 2,
    cover: book1,
    title: 'note 2',
    author: 'author 2',
    readno: 222,
    starno: 2,
    date: '2018-05-02',
    discription: 'discription of note 2',
},{
    ID: 3,
    cover: book1,
    title: 'note 3',
    author: 'author 3',
    readno: 333,
    starno: 3,
    date: '2018-05-03',
    discription: 'discription of note 3',
},{
    ID: 4,
    cover: book1,
    title: 'note 4',
    author: 'author 4',
    readno: 444,
    starno: 4,
    date: '2018-05-04',
    discription: 'discription of note 4',
},{
    ID: 5,
    cover: book1,
    title: 'note 5',
    author: 'author 5',
    readno: 555,
    starno: 5,
    date: '2018-05-05',
    discription: 'discription of note 5',
},{
    ID: 6,
    cover: book1,
    title: 'note 6',
    author: 'author 6',
    readno: 666,
    starno: 6,
    date: '2018-05-06',
    discription: 'discription of note 6',
},{
    ID: 7,
    cover: book1,
    title: 'note 7',
    author: 'author 7',
    readno: 777,
    starno: 7,
    date: '2018-05-07',
    discription: 'discription of note 7',
},{
    ID: 8,
    cover: book1,
    title: 'note 8',
    author: 'author 8',
    readno: 888,
    starno: 8,
    date: '2018-05-08',
    discription: 'discription of note 8',
}]

class StarNote extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        /* notes should get from server */
        this.setState({
            data: notes,
        })
        /* get specific info of notes */
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
                    <a style={{width:'100px',marginLeft:'48px'}}>笔记名称/描述</a>
                    <a style={{width:'40px',marginLeft:'300px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>阅读量</a>
                    <a style={{width:'40px',marginLeft:'63px'}}>赞</a>
                    <a style={{width:'70px',marginLeft:'80px'}}>创作日期</a>
                    <a style={{wdith:'50px',marginLeft:'90px'}}>操作</a>
                </p>
                </div>
                <List
                    style={{textAlign:'left',width:'915px'}}
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
                        /* 笔记显示页 */
                        title={<a href={'/viewnote?noteID='+item.ID}>{item.title}</a>}
                        description={item.discription}
                        />
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.author}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.readno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.starno}</a>
                        <a style={{width:'80px',marginLeft:'0px'}}>{item.date}</a>
                        
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default StarNote;
