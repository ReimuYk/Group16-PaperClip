import React, { Component } from 'react';
import { Anchor, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { username } from '../pages/loginpage';

class UserFloatMenu extends Component{
    render() {
        return(
            <div>
                <Anchor style={{float:'right',marginRight:'10%',marginTop:'5%'}}>
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
                            <Link to={'/user/stardoc'}>
                            <span>收藏的文档</span>
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
                    </Menu>
                </Anchor>
            </div>
        )
    }
}

export default UserFloatMenu;