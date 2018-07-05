import React, { Component } from 'react';
import { List, Avatar, Anchor, Menu } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';

/* should get from server */
import book1 from '../statics/book1.jpg';
const userID=1;
const data = [{
    key: 1,
    cover: book1,
    title: 'note 1',
    author: 'author 1',
    readno: 111,
    starno: 1,
    date: '2018-05-01',
    discription: 'discription of note 1',
},{
    key: 2,
    cover: book1,
    title: 'note 2',
    author: 'author 2',
    readno: 222,
    starno: 2,
    date: '2018-05-02',
    discription: 'discription of note 2',
},{
    key: 3,
    cover: book1,
    title: 'note 3',
    author: 'author 3',
    readno: 333,
    starno: 3,
    date: '2018-05-03',
    discription: 'discription of note 3',
},{
    key: 4,
    cover: book1,
    title: 'note 4',
    author: 'author 4',
    readno: 444,
    starno: 4,
    date: '2018-05-04',
    discription: 'discription of note 4',
},{
    key: 5,
    cover: book1,
    title: 'note 5',
    author: 'author 5',
    readno: 555,
    starno: 5,
    date: '2018-05-05',
    discription: 'discription of note 5',
},{
    key: 6,
    cover: book1,
    title: 'note 6',
    author: 'author 6',
    readno: 666,
    starno: 6,
    date: '2018-05-06',
    discription: 'discription of note 6',
},{
    key: 7,
    cover: book1,
    title: 'note 7',
    author: 'author 7',
    readno: 777,
    starno: 7,
    date: '2018-05-07',
    discription: 'discription of note 7',
},{
    key: 8,
    cover: book1,
    title: 'note 8',
    author: 'author 8',
    readno: 888,
    starno: 8,
    date: '2018-05-08',
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
                <p style={{textAlign:'left'}}>
                    <a style={{width:'100px',marginLeft:'48px'}}>笔记名称/描述</a>
                    <a style={{width:'40px',marginLeft:'420px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>阅读量</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>赞</a>
                    <a style={{marginLeft:'53px'}}>创作日期</a>
                </p>
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={item.cover} />}
                        /* 笔记显示页 */
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={item.discription}
                        />
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.author}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.readno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.starno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.date}</a>
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default StarNote;
