import React, {Component} from 'react';
import {  Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar.js';
import '../css/style.css';

/* fake data */

const { Header, Content, Sider } = Layout;
class UserSetting extends Component{
    state = {
        collapsed: false,
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
          content: '',
        });
    }
    render() {
        const collapsedIcon = (
            this.state.collapsed ? (
                <Icon onClick={this.toggle} type='double-right' />
            ) : (
                <Icon onClick={this.toggle} type='double-left' />
            )
        )
        return(
            <div>
                <NavBar />
                <div style={{height:'80%',width:'60%',display:'inline-block'}}>
                    <Layout style={{height:'100%'}}>
                        <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        >
                        <div className="logo" />
                        <Menu style={{height:'100%'}} theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                            </Menu.Item>
                            <Menu.Item>
                                {collapsedIcon}
                            </Menu.Item>
                        </Menu>
                        </Sider>
                        <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 560 }}>
                            {this.state.content}
                        </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        )
    }
}

export default UserSetting;