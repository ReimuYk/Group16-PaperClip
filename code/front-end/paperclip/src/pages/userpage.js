import React, { Component } from 'react';
import { Icon, Divider, Menu, List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';

import StarPaper from './starPaperPage';
import StarNote from './starNotePage';
import StarDoc from './starDocPage';
import StarUser from './StarUserPage';
import UserDoc from './userDocPage';
import UserNote from './userNotePage';
import UserFens from './userFensPage';

/* should get from server */
import uh1 from '../statics/uh.jpg';
const followno = 8;
const fensno   = 8;
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';
const data = [{
    key: 1,
    title: '动态 1',
    discription: 'discription of 动态 1',
},{
    key: 2,
    title: '动态 2',
    discription: 'discription of 动态 2',
},{
    key: 3,
    title: '动态 3',
    discription: 'discription of 动态 3',
},{
    key: 4,
    title: '动态 4',
    discription: 'discription of 动态 4',
},{
    key: 5,
    title: '动态 5',
    discription: 'discription of 动态 5',
},{
    key: 6,
    title: '动态 6',
    discription: 'discription of 动态 6',
},{
    key: 7,
    title: '动态 7',
    discription: 'discription of 动态 7',
},{
    key: 8,
    title: '动态 8',
    discription: 'discription of 动态 8',
}]

/* DON'T DELETE follow const vars! */
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class User extends Component{
    componentWillMount = () => {
        /* get user info ?? */
        /* like star papers, notes... */
        /* set data */
    }
    sendMail = () => {
        console.log('want to send mail to user id(key):', userID);
    }
    followUser = () => {
        console.log('want to follow user id(key):', userID);
    }
    render() {
        
        return(
            <div>
            <NavBar />
            <div id='u'>
                <div>
                <div id='u1'>
                    <div id='u1-1'>
                        <img alt='' src={uh1}
                        style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                        />
                    </div>
                    
                    <div id='u1-2'>
                        <br />
                        <br />
                        <br />
                        <h6>{ userName }</h6> 
                        <p>{ userIntro }</p>  
                    </div>
                    <div id='u1-3'>
                        <br />
                        <br />
                        <p style={{textAlign:'center'}}>
                        <Link to='/user/staruser'>
                        <a>关注:</a>
                        <a>{ followno }</a>
                        </Link>
                        <a style={{width:'80px',marginLeft:'20px'}}></a>
                        <Link to='/user/userfens'>
                        <a>粉丝:</a>
                        <a>{ fensno }</a>
                        </Link>
                        <br />
                        </p>
                        <p>
                        <span>
                        <Icon  onClick={this.sendMail} type='mail' style={{ fontSize: 30, color: '#08c' }} />
                        </span>
                        <a style={{width:'80px',marginLeft:'20px'}}></a>
                        <span>
                        <Icon  onClick={this.sendMail} type="plus-square-o" style={{ fontSize: 30, color: '#08c' }} />
                        </span>
                        <br />
                        <a onClick={this.sendMail}>发私信</a>
                        <a style={{width:'80px',marginLeft:'20px'}}></a>
                        <a onClick={this.followUser}>关注</a>
                        </p>
                    </div>
                </div>
                </div>
                <Divider type="vertical" />
                <div>
                <div id='u2'>
                    <div id='u2-1'>
                        <List
                            style={{textAlign:'left'}}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={uh1} />}
                                /* 论文显示页 */
                                title={<a href="/home">{item.title}</a>}
                                description={item.discription}
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                    <div id='u2-2'>
                        <Menu>
                        <Menu.Item>
                            <Link to='/user/starpaper'>
                            <span>收藏的论文</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/starnote'>
                            <span>收藏的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/stardoc'>
                            <span>收藏的文档</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/usernote'>
                            <span>写过的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to='/user/userdoc'>
                            <span>写过的文档</span>
                            </Link>
                        </Menu.Item>
                        </Menu>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default User;
