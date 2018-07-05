import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import book1 from '../statics/book1.jpg';
const userID = 1;
const data = [{
    key: 1,
    title: 'doc 1',
    description: 'description of doc 1',
},{
    key: 2,
    title: 'doc 2',
    description: 'description of doc 2',
},{
    key: 3,
    title: 'doc 3',
    description: 'description of doc 3',
},{
    key: 4,
    title: 'doc 4',
    description: 'description of doc 4',
},{
    key: 5,
    title: 'doc 5',
    description: 'description of doc 5',
},{
    key: 6,
    title: 'doc 6',
    description: 'description of doc 6',
},{
    key: 7,
    title: 'doc 7',
    description: 'description of doc 7',
},{
    key: 8,
    title: 'doc 8',
    description: 'description of doc 8',
}]

class UserDoc extends Component{
    componentWillMount = () => {
        /* get specific info of papers */
    }
    deleteDoc = (record, item) => {
        console.log('want to delete doc id(key):', item.key);
        /* send to server, refresh this page in get/post request */
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
            <List
                style={{textAlign:'left'}}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                <List.Item
                    actions={[<p>
                        <a style={{width:'75px'}} href={"/user/modifydoc?key="+item.key}>编辑文档</a> 
                        <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                            <a style={{width:'75px',marginLeft:'20px'}}>删除文档</a>
                        </Popconfirm>
                    </p>]}
                    >
                    <List.Item.Meta
                    avatar={<Avatar src={book1} />}
                    /* 论文显示页 */
                    title={<a href="https://ant.design">{item.title}</a>}
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

export default UserDoc;
