import React, { Component } from 'react';
import { Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';

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
},{
    key: 9,
    title: '动态 9',
    discription: 'discription of 动态 9',
},{
    key: 10,
    title: '动态 10',
    discription: 'discription of 动态 10',
},{
    key: 11,
    title: '动态 11',
    discription: 'discription of 动态 11',
},{
    key: 12,
    title: '动态 12',
    discription: 'discription of 动态 12',
},{
    key: 13,
    title: '动态 13',
    discription: 'discription of 动态 13',
},{
    key: 14,
    title: '动态 14',
    discription: 'discription of 动态 14',
},{
    key: 15,
    title: '动态 15',
    discription: 'discription of 动态 15',
},{
    key: 16,
    title: '动态 16',
    discription: 'discription of 动态 16',
}]


const { TextArea } = Input;
class User extends Component{
    state = {
        visible: false,
        mailContent: '',
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log('write mail');
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    componentWillMount = () => {
        /* get user info ?? */
        /* like star papers, notes... */
        /* set data */
    }
    followUser = () => {
        console.log('want to follow user id(key):', userID);
    }
    handleMailChange = (event) => {
        console.log('send mail', event.target.value);
        this.setState({ mailContent: event.target.value });
        /* send to server, server => that user */
    }
    clearInput = () => {
        this.setState({ mailContent: '' });
    }
    render() {
        
        return(
            <div>
            <NavBar />
            <Modal
                style={{height:'500px'}}
                width={500}
                title='私信'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.clearInput}
                >
                <TextArea rows={5} value={this.state.mailContent} onChange={this.handleMailChange} placeholder='私信内容' />
            </Modal>
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
                        <p>
                        <Link to='/user/staruser'>
                        <span>关注:</span>
                        <span>{ followno }</span>
                        </Link>
                        <Link to='/user/userfens'>
                        <span style={{width:'80px',marginLeft:'20px'}}>粉丝:</span>
                        <span>{ fensno }</span>
                        </Link>
                        <br />
                        </p>
                        <p>
                        <span>
                        <Icon  onClick={this.sendMail} type='mail' style={{ fontSize: 30, color: '#08c' }} />
                        </span>
                        <span style={{width:'80px',marginLeft:'20px'}}>
                        <Icon  onClick={this.showModal} type="plus-square-o" style={{ fontSize: 30, color: '#08c' }} />
                        </span>
                        <br />
                        <a onClick={this.showModal}>发私信</a>
                        <a style={{width:'80px',marginLeft:'20px'}} onClick={this.followUser}>关注</a>
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
                    
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default User;
