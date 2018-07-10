import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import IPaddress from '../App'
/* should get from server */
import uh1 from '../statics/uh.jpg';
const followno = 8;
const fensno   = 8;
const userID = 1;
const username = '用户名';
const userIntro = '用户描述';
const usersMoment = [{
    ID: 1,
    title: '用户动态 1',
    discription: 'discription of 用户动态 1',
},{
    ID: 2,
    title: '用户动态 2',
    discription: 'discription of 用户动态 2',
},{
    ID: 3,
    title: '用户动态 3',
    discription: 'discription of 用户动态 3',
},{
    ID: 4,
    title: '用户动态 4',
    discription: 'discription of 用户动态 4',
},{
    ID: 5,
    title: '用户动态 5',
    discription: 'discription of 用户动态 5',
},{
    ID: 6,
    title: '用户动态 6',
    discription: 'discription of 用户动态 6',
},{
    ID: 7,
    title: '用户动态 7',
    discription: 'discription of 用户动态 7',
},{
    ID: 8,
    title: '用户动态 8',
    discription: 'discription of 用户动态 8',
},{
    ID: 9,
    title: '用户动态 9',
    discription: 'discription of 用户动态 9',
},{
    ID: 10,
    title: '用户动态 10',
    discription: 'discription of 用户动态 10',
},{
    ID: 11,
    title: '用户动态 11',
    discription: 'discription of 用户动态 11',
},{
    ID: 12,
    title: '用户动态 12',
    discription: 'discription of 用户动态 12',
},{
    ID: 13,
    title: '用户动态 13',
    discription: 'discription of 用户动态 13',
},{
    ID: 14,
    title: '用户动态 14',
    discription: 'discription of 用户动态 14',
},{
    ID: 15,
    title: '用户动态 15',
    discription: 'discription of 用户动态 15',
},{
    ID: 16,
    title: '用户动态 16',
    discription: 'discription of 用户动态 16',
}]

const papersMoment = [{
    ID: 1,
    title: '论文动态 1',
    discription: 'discription of 论文动态 1',
},{
    ID: 2,
    title: '论文动态 2',
    discription: 'discription of 论文动态 2',
},{
    ID: 3,
    title: '论文动态 3',
    discription: 'discription of 论文动态 3',
},{
    ID: 4,
    title: '论文动态 4',
    discription: 'discription of 论文动态 4',
},{
    ID: 5,
    title: '论文动态 5',
    discription: 'discription of 论文动态 5',
},{
    ID: 6,
    title: '论文动态 6',
    discription: 'discription of 论文动态 6',
},{
    ID: 7,
    title: '论文动态 7',
    discription: 'discription of 论文动态 7',
},{
    ID: 8,
    title: '论文动态 8',
    discription: 'discription of 论文动态 8',
},{
    ID: 9,
    title: '论文动态 9',
    discription: 'discription of 论文动态 9',
},{
    ID: 10,
    title: '论文动态 10',
    discription: 'discription of 论文动态 10',
},{
    ID: 11,
    title: '论文动态 11',
    discription: 'discription of 论文动态 11',
},{
    ID: 12,
    title: '论文动态 12',
    discription: 'discription of 论文动态 12',
},{
    ID: 13,
    title: '论文动态 13',
    discription: 'discription of 论文动态 13',
},{
    ID: 14,
    title: '论文动态 14',
    discription: 'discription of 论文动态 14',
},{
    ID: 15,
    title: '论文动态 15',
    discription: 'discription of 论文动态 15',
},{
    ID: 16,
    title: '论文动态 16',
    discription: 'discription of 论文动态 16',
}]

const interactMoment = [{
    ID: 1,
    title: '互动动态 1',
    discription: 'discription of 互动动态 1',
},{
    ID: 2,
    title: '互动动态 2',
    discription: 'discription of 互动动态 2',
},{
    ID: 3,
    title: '互动动态 3',
    discription: 'discription of 互动动态 3',
},{
    ID: 4,
    title: '互动动态 4',
    discription: 'discription of 互动动态 4',
},{
    ID: 5,
    title: '互动动态 5',
    discription: 'discription of 互动动态 5',
},{
    ID: 6,
    title: '互动动态 6',
    discription: 'discription of 互动动态 6',
},{
    ID: 7,
    title: '互动动态 7',
    discription: 'discription of 互动动态 7',
},{
    ID: 8,
    title: '互动动态 8',
    discription: 'discription of 互动动态 8',
},{
    ID: 9,
    title: '互动动态 9',
    discription: 'discription of 互动动态 9',
},{
    ID: 10,
    title: '互动动态 10',
    discription: 'discription of 互动动态 10',
},{
    ID: 11,
    title: '互动动态 11',
    discription: 'discription of 互动动态 11',
},{
    ID: 12,
    title: '互动动态 12',
    discription: 'discription of 互动动态 12',
},{
    ID: 13,
    title: '互动动态 13',
    discription: 'discription of 互动动态 13',
},{
    ID: 14,
    title: '互动动态 14',
    discription: 'discription of 互动动态 14',
},{
    ID: 15,
    title: '互动动态 15',
    discription: 'discription of 互动动态 15',
},{
    ID: 16,
    title: '互动动态 16',
    discription: 'discription of 互动动态 16',
}]

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
class User extends Component{
    state = {
        visible: false,
        mailContent: '',
        data: papersMoment,
    }
    showStarUser = () => {
        console.log('show user');
        this.setState({
            data: usersMoment,
        })
    }
    showStarPaper = () => {
        console.log('show paper');
        this.setState({
            data: papersMoment,
        })
    }
    showInteract = () => {
        console.log('show interact');
        this.setState({
            data: interactMoment,
        })
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
        console.log('want to follow user username:', username);
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
                        <h6>{ username }</h6> 
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
                <Divider style={{width:'80%', display:'center'}}/>
                <div>
                <div id='u2'>
                    <div id='u2-1'>

                        {/* <List
                            style={{textAlign:'left'}}
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={uh1} />}
                                
                                title={<a href="/home">{item.title}</a>}
                                description={item.discription}
                                />
                            </List.Item>
                            )}
                        /> */}
                        <Layout className="layout">
                            {/* <Header> */}
                            <Menu
                                theme="light"
                                mode="horizontal"
                                defaultSelectedIDs={['2']}
                                style={{ lineHeight: '50px', width:'100%' }}
                            >
                                <Menu.Item ID="1"><a onClick={this.showStarUser}>关注的人的动态</a></Menu.Item>
                                <Menu.Item ID="2"><a onClick={this.showStarPaper}>收藏的论文的动态</a></Menu.Item>
                                <Menu.Item ID="3"><a onClick={this.showInteract}>最近互动动态</a></Menu.Item>
                            </Menu>
                            {/* </Header> */}
                        
                        <Content style={{backgroundColor:'#ffffff'}}>
                        <List
                            style={{textAlign:'left'}}
                            itemLayout="horizontal"
                            dataSource={this.state.data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src={uh1} />}
                                
                                title={<a href="/home">{item.title}</a>}
                                description={item.discription}
                                />
                            </List.Item>
                            )}
                        />
                        </Content>
                        </Layout>
                    </div>
                   
                    <UserFloatMenu />
                    
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default User;
