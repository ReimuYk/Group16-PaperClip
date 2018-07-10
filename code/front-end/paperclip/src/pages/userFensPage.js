import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
import UserFloatMenu from '../components/userFloatMenu';
import username from './loginpage';
const userID=1;
const data = [{
    fensName: 'fens 1',
    description: 'description of fens 1',
},{
    fensName: 'fens 2',
    description: 'description of fens 2',
},{
    fensName: 'fens 3',
    description: 'description of fens 3',
},{
    fensName: 'fens 4',
    description: 'description of fens 4',
},{
    fensName: 'fens 5',
    description: 'description of fens 5',
},{
    fensName: 'fens 6',
    description: 'description of fens 6',
},{
    fensName: 'fens 7',
    description: 'description of fens 7',
},{
    fensName: 'fens 8',
    description: 'description of fens 8',
}]

class UserFens extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        /* get specific info of fens */
    }
    follow = (item, record) => {
        console.log('want to follow user: username(id):',item.username);
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
                    <List.Item actions={[<a onClick={this.follow.bind(this, item)}>关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href={"/user?username="+item.username}>{item.fensName}</a>}
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

export default UserFens;
