import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */

var username = '';
var information = {
    userheader:'',
    fansno:0,
    followno:0,
    userDescription:''
}
const { Content } = Layout;
class User extends Component{
    state = {
        visible: false,
    }
    showStarUser = () => {
        console.log('show user');
    }
    showStarPaper = () => {
        console.log('show paper');
    }
    showInteract = () => {
        console.log('show interact');
    }
    componentWillMount = () => {
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        this.setState({
            username: username
        })
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/hostInfo';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                information.userheader = data.userheader;
                information.fansno = data.fansno;
                information.followno = data.followno;
                information.userDescription = data.userDescription;
                that.setState({

                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render() {
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
            <NavBar />
            <div id='u'>
                <div>
                <div id='u1'>
                    <div id='u1-1'>
                        <img alt='' src={ information.userheader }
                        style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                        />
                    </div>
                    
                    <div id='u1-2'>
                        <br />
                        <br />
                        <br />
                        <h6>{ username }</h6>
                        <p>{ information.userDescription }</p>
                    </div>
                    <div id='u1-3' style={{marginTop:"40px"}}>
                        <Link to='/user/staruser'>
                            <Button style={{width:"100px"}} size="large" type="primary">关注（ { information.followno } ）</Button>
                        </Link>
                        <Link to='/user/userfans'>
                            <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary">粉丝 （ { information.fansno} ）</Button>
                        </Link>
                    </div>
                </div>
                </div>
                <Divider style={{width:'80%', display:'center'}}/>
                <div>
                <div id='u2'>
                    <div id='u2-1'>
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
                                avatar={<Avatar/>}
                                
                                title={<a href="/home">{item.title}</a>}
                                description={item.description}
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
