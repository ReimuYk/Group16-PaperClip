import React, { Component } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import reqwest from 'reqwest';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';

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
                    loading={loading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={this.quitFollow}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
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
