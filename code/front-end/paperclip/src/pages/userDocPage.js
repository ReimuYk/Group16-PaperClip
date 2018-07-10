import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFLoatMenu from '../components/userFloatMenu';
import username from './loginpage';
/* should get from server */
import book1 from '../statics/book1.jpg';
import IPaddress from '../App'
const docs = [{
    ID: 1,
    title: 'doc 1',
    date: '2018-07-01',
    description: 'description of doc 1',
},{
    ID: 2,
    title: 'doc 2',
    date: '2018-07-01',
    description: 'description of doc 2',
},{
    ID: 3,
    title: 'doc 3',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 3',
},{
    ID: 4,
    title: 'doc 4',
    date: '2018-07-01',
    description: 'description of doc 4',
},{
    ID: 5,
    title: 'doc 5',
    date: '2018-07-01',
    description: 'description of doc 5',
},{
    ID: 6,
    title: 'doc 6',
    date: '2018-07-01',
    description: 'description of doc 6',
},{
    ID: 7,
    title: 'doc 7',
    date: '2018-07-01',
    description: 'description of doc 7',
},{
    ID: 8,
    title: 'doc 8',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 8',
}]

class UserDoc extends Component{
    state = {
        data: [],
        username: 0,
    }
    componentWillMount = () => {
        /* get userID */
        var that = this;
        var url = window.location.href;
        var theRequest = new Object();
        if ( url.indexOf( "?" ) != -1 ) {
            var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split( "&" );
            for ( var i = 0; i < strs.length; i++ ) {
                theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
            }
            var urlUserID = this.props.location.search.substring(8);//8 == 'userID='.length+1 (url: ...?userID=xxx)
            that.setState({
                userID: urlUserID,
            })
            console.log('userID:', urlUserID);
        }
        /* get docs according to userID */
        this.setState({
            data: docs,
        })
    }
    deleteDoc = (record, item) => {
        console.log('want to delete doc id(ID):', item.ID);
        /* send ID to server */
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
    }
    newDoc = () => {
        var tmpdata = this.state.data;
        var obj = {
            ID: 1,
            title: '新建文档',
            cover: book1,
            date: '2018-07-01',
            description: 'description of doc 1',
        };
        tmpdata.push(obj);
        this.setState({
            data: tmpdata
        })
    }
    render(){
        return(
            <div>
                <NavBar />
            
            <UserFLoatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
                <div className="button" style={{width:"100%", height:"50px"}}>
                    <Button style={{float:"right"}} type="primary" onClick={this.newDoc}>新建文档</Button>
                </div>
                <div className="content">
                    <p style={{marginLeft:'490px'}}>上次修改日期</p>
                    <List
                        style={{textAlign:'left'}}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<p>
                                    <a style={{width:'75px'}} href={"/user/writedoc?ID="+item.ID}>编辑文档</a>
                                    <a style={{width:'75px', marginLeft:'20px'}} href={"/user/docdetail?ID="+item.ID}>查看文档版本</a>
                                    <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                                        <a style={{width:'75px',marginLeft:'20px'}}>删除文档</a>
                                    </Popconfirm>
                                </p>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.cover} />}
                                    /* 论文显示页 */
                                    title={<a href={"/viewdoc?docID="+item.ID}>{item.title}</a>}
                                    description={item.description}
                                />
                                <p>{item.date}</p>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
        )
    }
}

export default UserDoc;
