import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import username from './loginpage';
import UserFloatMenu from '../components/userFloatMenu';

/* should get from server */
import uh from '../statics/uh.jpg';

const data = [{
    userName: 'user 1',
    description: 'description of user 1',
},{
    userName: 'user 2',
    description: 'description of user 2',
},{
    userName: 'user 3',
    description: 'description of user 3',
},{
    userName: 'user 4',
    description: 'description of user 4',
},{
    userName: 'user 5',
    description: 'description of user 5',
},{
    userName: 'user 6',
    description: 'description of user 6',
},{
    userName: 'user 7',
    description: 'description of user 7',
},{
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
        console.log('want to quit follow user: username:',item.userName);
        /* tell the server to do something */
    }
    render(){
        return(
            <div>
            <NavBar />
            
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={this.quitFollow.bind(this, item)}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href={"/user?username="+item.username}>{item.userName}</a>}
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
