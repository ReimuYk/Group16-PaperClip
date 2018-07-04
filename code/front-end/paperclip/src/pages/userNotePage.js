import React, { Component } from 'react';
import { List, Avatar, Popconfirm } from 'antd';
import NavBar from '../components/nav-bar';
/* should get from server */
import book1 from '../statics/book1.jpg';
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';
const data = [{
    key: 1,
    title: 'note 1',
    description: 'description of note 1',
},{
    key: 2,
    title: 'note 2',
    description: 'description of note 2',
},{
    key: 3,
    title: 'note 3',
    description: 'description of note 3',
},{
    key: 4,
    title: 'note 4',
    description: 'description of note 4',
},{
    key: 5,
    title: 'note 5',
    description: 'description of note 5',
},{
    key: 6,
    title: 'note 6',
    description: 'description of note 6',
},{
    key: 7,
    title: 'note 7',
    description: 'description of note 7',
},{
    key: 8,
    title: 'note 8',
    description: 'description of note 8',
},{
    key: 9,
    title: 'note 9',
    description: 'description of note 9',
},{
    key: 10,
    title: 'note 10',
    description: 'description of note 10',
},{
    key: 11,
    title: 'note 11',
    description: 'description of note 11',
}]
class UserNote extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        /* get specific info of papers */
    }
    deleteNote = (record, item) => {
        console.log('want to delete note id(key):', item.key);
        /* send to server, refresh this page in get/post request */
    }
    render(){
        return(
            <div>
            <NavBar />
            <div style={{width:'70%',display:'inline-block'}}>
       
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<p>
                                            <a style={{width:'75px'}} href="/home">编辑笔记</a> 
                                            <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteNote(this, item)}>
                                                <a style={{width:'75px',marginLeft:'20px'}}>删除笔记</a>
                                            </Popconfirm>
                                        </p>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ book1 } />}
                        title={<a href="/home">{item.title}</a>}
                        description={item.description}
                        />
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default UserNote;
