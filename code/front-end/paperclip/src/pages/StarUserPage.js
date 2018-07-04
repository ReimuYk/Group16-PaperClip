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
    title: 'note 1',
    discription: 'discription of note 1',
},{
    key: 2,
    title: 'note 2',
    discription: 'discription of note 2',
},{
    key: 3,
    title: 'note 3',
    discription: 'discription of note 3',
},{
    key: 4,
    title: 'note 4',
    discription: 'discription of note 4',
},{
    key: 5,
    title: 'note 5',
    discription: 'discription of note 5',
},{
    key: 6,
    title: 'note 6',
    discription: 'discription of note 6',
},{
    key: 7,
    title: 'note 7',
    discription: 'discription of note 7',
},{
    key: 8,
    title: 'note 8',
    discription: 'discription of note 8',
}]

class StarUser extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        /* get specific info of papers */
    }
    quitFollow = (e) => {
        console.log('e',e);
    }
    render(){
        return(
            <div>
                <NavBar />
                这是关注用户
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={this.quitFollow}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ uh } />}
                        title={<a href="https://ant.design">{item.name.last}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default StarUser;
