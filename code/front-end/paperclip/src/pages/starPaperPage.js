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
    title: 'paper 1',
    discription: 'discription of paper 1',
},{
    key: 2,
    title: 'paper 2',
    discription: 'discription of paper 2',
},{
    key: 3,
    title: 'paper 3',
    discription: 'discription of paper 3',
},{
    key: 4,
    title: 'paper 4',
    discription: 'discription of paper 4',
},{
    key: 5,
    title: 'paper 5',
    discription: 'discription of paper 5',
},{
    key: 6,
    title: 'paper 6',
    discription: 'discription of paper 6',
},{
    key: 7,
    title: 'paper 7',
    discription: 'discription of paper 7',
},{
    key: 8,
    title: 'paper 8',
    discription: 'discription of paper 8',
}]

class StarPaper extends Component{
    componentWillMount = () => {
        /* get specific info of papers */
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
                        /* 论文显示页 */
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

export default StarPaper;
