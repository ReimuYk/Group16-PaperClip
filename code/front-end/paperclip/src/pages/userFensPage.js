import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'

const data = [{
    key: 1,
    fensName: 'fens 1',
    description: 'description of fens 1',
},{
    key: 2,
    fensName: 'fens 2',
    description: 'description of fens 2',
},{
    key: 3,
    fensName: 'fens 3',
    description: 'description of fens 3',
},{
    key: 4,
    fensName: 'fens 4',
    description: 'description of fens 4',
},{
    key: 5,
    fensName: 'fens 5',
    description: 'description of fens 5',
},{
    key: 6,
    fensName: 'fens 6',
    description: 'description of fens 6',
},{
    key: 7,
    fensName: 'fens 7',
    description: 'description of fens 7',
},{
    key: 8,
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
        console.log('want to follow user: key(id):',item.key);
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
                    <List.Item actions={[<a onClick={this.follow.bind(this, item)}>关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href="https://ant.design">{item.fensName}</a>}
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
