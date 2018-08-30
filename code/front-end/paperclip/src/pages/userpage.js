import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor, Button,Tabs, Card, Row, Col } from 'antd';
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
var menu = [
    {
        text:'收藏的论文',
        link:'/user/starpaper',
        num:0
    },
    {
        text:'收藏的笔记',
        link:'/user/starnote',
        num:0,
    },
    {
        text:'写过的笔记',
        link:'/user/usernote',
        num:0
    },
    {
        text:'写过的文档',
        link:'/user/userdoc',
        num:0
    },
    {
        text:'协作的文档',
        link:'/user/assistdoc',
        num:0
    }
]
const { Header, Footer, Sider, Content } = Layout;
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
                menu[0].num = data.starPaperNo
                menu[1].num = data.starNoteNo
                menu[2].num = data.writeNoteNo
                menu[3].num = data.writeDocNo
                menu[4].num = data.assistNo
                that.setState({

                })
            }).catch(function(e){
            console.log("Oops, error");
        })
        url = IPaddress + 'service/starNoteNews';
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                information.myStarNote = data;
                this.setState({
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
                                title={<p>你 点赞了 <a href={'/viewnote?noteID=' + item.noteID}>{item.noteTitle}</a></p>}
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
                                title={<p>你 收藏了 <a href={'/viewnote?noteID=' + item.noteID}>{item.noteTitle}</a></p>}
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
                                title={<p>你 收藏了 <a href={'/paper?paperID=' + item.paperID}>{item.paperTitle}</a></p>}
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
                                title={<p>你 新建了笔记 <a href={'/viewnote?noteID=' + item.noteID}>{item.noteTitle}</a></p>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    callback = (key) =>{
        if(key == '0'){
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/starNoteNews';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    information.myStarNote = data;
                    this.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }
        if(key == '1'){
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/starPaperNews';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    information.myStarPaper = data;
                    this.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }
        if(key == '2'){
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/likeNoteNews';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    information.myLike = data;
                    this.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
        }
        if(key == '3'){
            let jsonbody = {};
            jsonbody.username = username;
            let url = IPaddress + 'service/writeNoteNews';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
                .then(response=>response.text())
                .then(responseJson=>{
                    let data = eval(responseJson);
                    information.myWrite = data;
                    this.setState({
                    })
                }).catch(function(e){
                console.log("Oops, error");
            })
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
                <Card style={{width:'60%', margin:'auto', marginTop:'50px', boxShadow:"0px 1px 3px #BDBCBC",
                    borderRadius:"2px"}}>
                    <Layout>
                        <Sider style={{background:'white'}}>
                            <img alt='' src={ information.userheader }
                                 style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block', marginTop:'20px'}}
                            />
                        </Sider>
                        <Layout>
                            <Content style={{background:'white', textAlign:'left'}}>
                                <div class="information" style={{marginLeft:'20px', marginTop:'50px'}}>
                                    <h3>{ username }</h3>
                                    <span>{ information.userDescription }</span>
                                </div>
                            </Content>
                            <Footer style={{background:'white', textAlign:'right'}}>
                                <Link to="/user/setting">
                                    <Button>编辑个人资料</Button>
                                </Link>
                            </Footer>
                        </Layout>
                    </Layout>
                </Card>
                <div style={{width:'16%', position:'absolute', right:'20%', marginTop:'20px',boxShadow:"0px 1px 3px #BDBCBC",
                    borderRadius:"2px",}}>
                    <Row>
                        <Col span={12}>
                            <Link to="/user/staruser">
                                <Card>
                                    <div className="content">
                                        <h4>关注</h4>
                                        <span>{information.followno}</span>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                        <Col span={12}>
                            <Link to="/user/userfans">
                                <Card>
                                    <div className="content">
                                        <h4>粉丝</h4>
                                        <span>{information.fansno}</span>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <div style={{width:'42%', position:'absolute', left:'20%', marginTop:'20px', marginRight:'20px', textAlign:'left', boxShadow:"0px 1px 3px #BDBCBC",
                    borderRadius:"2px", paddingRight:'20px', paddingLeft:'20px', paddingBottom:'20px', height:'500px', background:'white'}}>
                    <Tabs defaultActiveKey="0" onChange={this.callback} >
                        <TabPane tab="我的收藏笔记" key="0">{myStarNote}</TabPane>
                        <TabPane tab="我的收藏论文" key="1">{myStarPaper}</TabPane>
                        <TabPane tab="我的点赞" key="2">{myLike}</TabPane>
                        <TabPane tab="我的创作" key="3">{myWrite}</TabPane>
                    </Tabs>
                </div>
                <div style={{width:'16%', position:'absolute', right:'20%', marginTop:'130px'}}>
                    <List
                        itemLayout="horizontal"
                        dataSource={menu}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Link to={item.link}>
                                            <Row>
                                                <Col span={12} style={{textAlign:'left'}}>
                                                    {item.text}
                                                </Col>
                                                <Col span={12} style={{textAlign:'right'}}>
                                                    {item.num}
                                                </Col>
                                            </Row>
                                        </Link>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        )
    }
}

export default User;
