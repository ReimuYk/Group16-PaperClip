import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import NavBar from '../components/nav-bar';

/* should get from server */
import book1 from '../statics/book1.jpg';
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

class StarNote extends Component{
    componentWillMount = () => {
        /* get specific info of notes */
    }
    render(){
        return(
            <div>
            <NavBar />
            <div style={{width:'70%',display:'inline-block'}}>
            
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={book1} />}
                        /* 笔记显示页 */
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.discription}
                        />
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default StarNote;
