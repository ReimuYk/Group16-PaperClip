import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
const userID=1;
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
