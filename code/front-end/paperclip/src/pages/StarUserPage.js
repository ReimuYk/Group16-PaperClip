import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';
const data = [{
    key: 1,
    userName: 'user 1',
    description: 'description of user 1',
},{
    key: 2,
    userName: 'user 2',
    description: 'description of user 2',
},{
    key: 3,
    userName: 'user 3',
    description: 'description of user 3',
},{
    key: 4,
    userName: 'user 4',
    description: 'description of user 4',
},{
    key: 5,
    userName: 'user 5',
    description: 'description of user 5',
},{
    key: 6,
    userName: 'user 6',
    description: 'description of user 6',
},{
    key: 7,
    userName: 'user 7',
    description: 'description of user 7',
},{
    key: 8,
    userName: 'user 8',
    description: 'description of user 8',
}]

class StarUser extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        /* get specific info of papers */
    }
    quitFollow = (item, record) => {
        console.log('want to quit follow user: key(id):',item.key);
        /* tell the server to do something */
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
                    <List.Item actions={[<a onClick={this.quitFollow.bind(this, item)}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href="https://ant.design">{item.userName}</a>}
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

export default StarUser;
