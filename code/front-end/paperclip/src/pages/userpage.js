import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor, Button,Tabs } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
const TabPane = Tabs.TabPane;
var username = '';
var information = {
    userheader:'',
    fansno:0,
    followno:0,
    userDescription:'',
    myStarNote:[],
    myStarPaper:[],
    myLike:[],
    myWrite:[]
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
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
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
    renderMyLike = () =>{
        return(
            <div style={{textAlign:'left'}}>
                <List
                    itemLayout="horizontal"
                    dataSource={information.myLike}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p>你点赞了<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    renderMyStarNote = () =>{
        return(
            <div style={{textAlign:'left'}}>
                <List
                    itemLayout="horizontal"
                    dataSource={information.myStarNote}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p>你收藏了<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    renderMyStarPaper = () =>{
        return(
            <div style={{textAlign:'left'}}>
                <List
                    itemLayout="horizontal"
                    dataSource={information.myStarPaper}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<p>你收藏了<a href={'/paper?paperID=' + item.paperID}>{item.title}</a></p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    renderMyWrite = () =>{
        return(
            <div style={{textAlign:'left'}}>
                <List
                    itemLayout="horizontal"
                    dataSource={information.myWrite}
                    renderItem={item => (
                        <List.Item
                            actions={[<p>{item.time}</p>]}
                        >
                            <List.Item.Meta
                                title={<p>你新建了笔记<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    callback = (key) =>{
        if(key == '0'){

        }
        if(key == '1'){

        }
        if(key == '2'){

        }
        if(key == '3'){

        }
    }
    render() {
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        const myLike = this.renderMyLike();
        const myStarNote = this.renderMyStarNote();
        const myStarPaper = this.renderMyStarPaper();
        const myWrite = this.renderMyWrite();
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
                    <div id='u2-1' style={{textAlign:'left'}}>
                            {/* <Header> */}
                            <Tabs defaultActiveKey="1" onChange={this.callback}>
                                <TabPane tab="我的收藏笔记" key="0">{myStarNote}</TabPane>
                                <TabPane tab="我的收藏论文" key="1">{myStarPaper}</TabPane>
                                <TabPane tab="我的点赞" key="2">{myLike}</TabPane>
                                <TabPane tab="我的创作" key="3">{myWrite}</TabPane>
                            </Tabs>
                            {/* </Header> */}
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
