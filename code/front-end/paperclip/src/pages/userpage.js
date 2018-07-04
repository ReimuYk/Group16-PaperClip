import React, { Component } from 'react';
import { Icon, Divider, Menu } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';

import StarPaper from './starPaperPage';
import StarNote from './starNotePage';
import StarDoc from './starDocPage';
import StarUser from './StarUserPage';
import UserComment from './UserCommentPage';
import UserDoc from './userDocPage';
import UserNote from './userNotePage';
import UserFens from './userFensPage';

/* should get from server */
import uh1 from '../statics/uh.jpg';
const followno = 233;
const fensno   = 23;
const userName = '用户名';
const userIntro = '用户描述';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class User extends Component{
    componentWillMount = () => {
        /* get user info ?? */
        /* like star papers, notes... */
        /* set data */
    }
    render() {
        return(
            <div id='u'>
            <NavBar />
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
                        <Link to='/user/userfens'>
                        <a>   粉丝:</a>
                        <a>{ fensno }</a>
                        </Link>
                        
                        <br />

                        </p>
                        <span>
                        <Icon type='mail' style={{ fontSize: 30, color: '#08c' }} />
                        <span>
                            发私信
                        </span>
                        </span>
                        <span>
                        <Icon type="plus-square-o" style={{ fontSize: 30, color: '#08c' }} />
                        <span>
                            关注
                        </span>
                        </span>
                    </div>
                </div>
                </div>
                <Divider type="vertical" />
                <div>
                <div id='u2'>
                    <div id='u2-1'>
                        <p>动态1</p>
                        <p>动态2</p>
                        <p>动态3</p>
                        <p>动态4</p>
                        <p>动态5</p>
                        <p>动态6</p>
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
                        <Menu.Item>
                            <Link to='/user/usercomment'>
                            <span>写过的批注</span>
                            </Link>
                        </Menu.Item>
                        </Menu>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default User;
