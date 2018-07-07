import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import book1 from '../statics/book1.jpg';
const userID = 1;
const docs = [{
    key: 1,
    title: 'doc 1',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 1',
},{
    key: 2,
    title: 'doc 2',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 2',
},{
    key: 3,
    title: 'doc 3',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 3',
},{
    key: 4,
    title: 'doc 4',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 4',
},{
    key: 5,
    title: 'doc 5',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 5',
},{
    key: 6,
    title: 'doc 6',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 6',
},{
    key: 7,
    title: 'doc 7',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 7',
},{
    key: 8,
    title: 'doc 8',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 8',
}]

class UserDoc extends Component{
    state = {
        data: [],
        userID: 0,
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
        console.log('want to delete doc id(key):', item.key);
        /* send key to server */
        var that = this;
        var tmpdata = that.state.data;
        var dataLen = tmpdata.length;
        for(let i=0; i<dataLen; i++){
            if(tmpdata[i].key == item.key){
                tmpdata.splice(i, 1);
                break;
            }
        }
        console.log('want to quit star paper: id(key): ', item.key-1);
        that.setState({
            data: tmpdata,
        })
    }
    newDoc = () => {
        var tmpdata = this.state.data;
        var obj = {
            key: 1,
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
            <Anchor style={{float:'right',marginRight:'10%',marginTop:'5%'}}>
                <Menu>
                    <Menu.Item>
                        <Link to={'/user/starpaper?userID='+userID}>
                        <span>收藏的论文</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/user/starnote?userID='+userID}>
                        <span>收藏的笔记</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/user/stardoc?uesrID='+userID}>
                        <span>收藏的文档</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/user/usernote?userID='+userID}>
                        <span>写过的笔记</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to={'/user/userdoc?userID='+userID}>
                        <span>写过的文档</span>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
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
                                    <a style={{width:'75px'}} href={"/user/writedoc?key="+item.key}>编辑文档</a>
                                    <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                                        <a style={{width:'75px',marginLeft:'20px'}}>删除文档</a>
                                    </Popconfirm>
                                </p>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.cover} />}
                                    /* 论文显示页 */
                                    title={<a href={"/viewdoc?docID="+item.key}>{item.title}</a>}
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
