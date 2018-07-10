import React, { Component } from 'react';

import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';

/* should get from server */
import book1 from '../statics/book1.jpg';
import username from './loginpage';
const docs = [{
    ID: 1,
    cover: book1,
    title: 'doc 1',
    author: 'author 1',
    readno: 111,
    starno: 1,
    date: '2018-05-01',
    description: 'description of doc 1',
},{
    ID: 2,
    cover: book1,
    title: 'doc 2',
    author: 'author 2',
    readno: 222,
    starno: 2,
    date: '2018-05-02',
    description: 'description of doc 2',
},{
    ID: 3,
    cover: book1,
    title: 'doc 3',
    author: 'author 3',
    readno: 333,
    starno: 3,
    date: '2018-05-03',
    description: 'description of doc 3',
},{
    ID: 4,
    cover: book1,
    title: 'doc 4',
    author: 'author 4',
    readno: 444,
    starno: 4,
    date: '2018-05-04',
    description: 'description of doc 4',
},{
    ID: 5,
    cover: book1,
    title: 'note 5',
    author: 'author 5',
    readno: 555,
    starno: 5,
    date: '2018-05-05',
    description: 'description of doc 5',
},{
    ID: 6,
    cover: book1,
    title: 'doc 6',
    author: 'author 6',
    readno: 666,
    starno: 6,
    date: '2018-05-06',
    description: 'description of doc 6',
},{
    ID: 7,
    cover: book1,
    title: 'doc 7',
    author: 'author 7',
    readno: 777,
    starno: 7,
    date: '2018-05-07',
    description: 'description of doc 7',
},{
    ID: 8,
    cover: book1,
    title: 'doc 8',
    author: 'author 8',
    readno: 888,
    starno: 8,
    date: '2018-05-08',
    description: 'description of doc 8',
}]
class StarDoc extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        this.setState({
            data: docs,
        })
        /* get username */
        var url = window.location.href; 
        var theRequest = new Object();
        if ( url.indexOf( "?" ) != -1 ) {
            var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split( "&" );
            for ( var i = 0; i < strs.length; i++ ) {
                theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
            }
            var urlUserName = this.props.location.search.substring(10);//10 == 'username='.length+1 (url: ...?username=xxx)
            console.log('username:', urlUserName);
        }
        /* get specific info of docs */
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
                    <a style={{width:'100px',marginLeft:'48px'}}>文档名称/描述</a>
                    <a style={{width:'40px',marginLeft:'300px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>阅读量</a>
                    <a style={{width:'40px',marginLeft:'58px'}}>收藏量</a>
                    <a style={{width:'70px',marginLeft:'60px'}}>创作日期</a>
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
                        title={<a href={"/viewdoc?docID="+item.ID}>{item.title}</a>}
                        description={item.description}
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

export default StarDoc;
