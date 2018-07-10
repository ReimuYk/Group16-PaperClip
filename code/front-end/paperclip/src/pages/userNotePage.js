import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import username from './loginpage';

/* should get from server */
import book1 from '../statics/book1.jpg';
const userID=1;
const notes = [{
    ID: 1,
    title: 'note 1',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 1',
},{
    ID: 2,
    title: 'note 2',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 2',
},{
    ID: 3,
    title: 'note 3',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 3',
},{
    ID: 4,
    title: 'note 4',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 4',
},{
    ID: 5,
    title: 'note 5',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 5',
},{
    ID: 6,
    title: 'note 6',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 6',
},{
    ID: 7,
    title: 'note 7',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 7',
},{
    ID: 8,
    title: 'note 8',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 8',
},{
    ID: 9,
    title: 'note 9',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 9',
},{
    ID: 10,
    title: 'note 10',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 10',
},{
    ID: 11,
    title: 'note 11',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 11',
}]
class UserNote extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        this.setState({
            data: notes,
        })
        /* get userID */
        var url = window.location.href; 
        var theRequest = new Object();
        if ( url.indexOf( "?" ) != -1 ) {
            var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split( "&" );
            for ( var i = 0; i < strs.length; i++ ) {
                theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
            }
            var urlUserID = this.props.location.search.substring(8);//8 == 'userID='.length+1 (url: ...?userID=xxx)
            console.log('userID:', urlUserID);
        }
        /* get specific info of papers */
    }
    deleteNote = (record, item) => {
        console.log('want to delete note id(ID):', item.ID);
        /* send to server, refresh this page in get/post request */
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
    render(){
        return(
            <div>
            <NavBar />
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
            <p style={{marginLeft:'465px'}}>上次修改日期</p>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item actions={[<p>
                                            <a style={{width:'75px'}} href={"writedoc?ID="+item.ID}>编辑笔记</a>
                                            <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteNote(this, item)}>
                                                <a style={{width:'75px',marginLeft:'20px'}}>删除笔记</a>
                                            </Popconfirm>
                                        </p>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ book1 } />}
                        title={<a href={"/viewnote?noteID="+item.ID}>{item.title}</a>}
                        description={item.description}
                        />
                        <p>{item.date}</p>
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default UserNote;
