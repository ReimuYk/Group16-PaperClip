import React, { Component } from 'react';
import { Anchor, Menu } from 'antd';
import { Link } from 'react-router-dom';

var username='';

class UserFloatMenu extends Component{
    render() {
        username = sessionStorage.getItem('username');
        return(
            <div style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
            borderRadius:"2px",marginTop:"1%",marginBottom:"2%",
            right:'10%',top:'78px',position:"fixed",width:"10%"}}>
               
                    <Menu>
                        <Menu.Item>
                            <Link to={'/user/starpaper'}>
                            <span>收藏的论文</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/starnote'}>
                            <span>收藏的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/usernote'}>
                            <span>写过的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/userdoc'}>
                            <span>写过的文档</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/assistdoc'}>
                                <span>协作的文档</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
               
            </div>
        )
    }
}

export default UserFloatMenu;