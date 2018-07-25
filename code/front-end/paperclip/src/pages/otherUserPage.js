import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor, Button, message, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
const TabPane = Tabs.TabPane;
var username='';
var information = {
    avatar:'',
    username:'',
    fansno:0,
    userDescription:'',
}
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
class OtherUserPage extends Component{
    state = {
        visible: false,
        mailContent: '',
        moment: [],
        ifFollow: false
    }
    showModal = () => {
        if(username == null || username == ''){
            message.error("请先登录", 3);
            return;
        }
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        if(username == null || username == ''){
            message.error("请先登录", 3);
            return;
        }
        if(this.state.mailContent == ''){
            message.error("内容不能为空！", 3);
            return;
        }
        let that  = this;
        let jsonbody = {};
        jsonbody.senderName = username;
        jsonbody.receiverName = information.username;
        jsonbody.content = that.state.mailContent;
        var url = IPaddress + 'service/sendMessage';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                that.setState({
                    mailContent: '',
                    visible: false
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.clearInput();
    }
    componentWillMount = () => {
        information.username = this.props.location.search.substring(10);//username=
        username = sessionStorage.getItem('username');
        if(username == information.username && username != ''){
            window.location.href = "/user";
        }

        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = information.username;
        let url = IPaddress + 'service/clientInfo';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('('+responseJson+')');
                information.avatar = data.userheader;
                information.fansno = data.fensno;
                information.userDescription = data.userDescription;
                information.username = data.username;
                this.setState({
                    ifFollow: data.isStar
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    followUser = () => {
        if(username == null || username == ''){
            message.error("请先登录", 3);
            return;
        }
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = information.username;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('('+responseJson+')');
                if(result.result == "fail"){
                    message.error("关注失败，请重试", 3);
                }
                information.fansno = result.fansno;
                that.setState({
                    ifFollow:true
                })
            }).catch(function(e) {
            console.log("Oops, error");
        })
    }
    quitFollow = () => {
        if(username == null || username == ''){
            message.error("请先登录", 3);
            return;
        }
        let that = this;
        /* tell the server to do something */
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = information.username;
        let url = IPaddress + 'service/quitStar/user';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    information.fansno = result.fansno;
                    that.setState({
                        ifFollow: false
                    })
                }
                else{
                    message.error("取消错误，请重试", 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleMailChange = (event) => {
        if(username == null || username == ''){
            message.error("请先登录", 3);
            return;
        }
        console.log('send mail', event.target.value);
        this.setState({ mailContent: event.target.value });
        /* send to server, server => that user */
    }
    clearInput = () => {
        this.setState({ mailContent: '' });
    }
    renderButton = () => {
        if(this.state.ifFollow){
            return(
                <Button style={{width:"100px", marginLeft:"10px", marginTop:'40px'}} size="large" type="primary" onClick={this.quitFollow}>取消关注</Button>
            )
        }
        else{
            return(
                <Button style={{width:"100px", marginLeft:"10px", marginTop:'40px'}} size="large" type="primary" onClick={this.followUser}><Icon type='plus-square-o' />关注 { (information.fansno) }</Button>
            )
        }
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
                                title={<p>ta点赞了<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
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
                                title={<p>ta收藏了<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
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
                                title={<p>ta收藏了<a href={'/paper?paperID=' + item.paperID}>{item.title}</a></p>}
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
                                title={<p>ta新建了笔记<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a></p>}
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
        const myLike = this.renderMyLike();
        const myStarNote = this.renderMyStarNote();
        const myStarPaper = this.renderMyStarPaper();
        const myWrite = this.renderMyWrite();
        const button = this.renderButton();
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
                        <img alt='' src={ information.avatar }
                        style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                        />
                    </div>
                    
                    <div id='u1-2'>
                        <br />
                        <br />
                        <br />
                        <h6>{ information.username }</h6>
                        <p>{ information.userDescription }</p>
                    </div>
                    <div id='u1-3'>
                        <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                        {button}
                    </div>
                </div>
                </div>
                <Divider style={{width:'80%', display:'center'}}/>
                <div>
                <div id='u2'>
                    <div id='u2-1' style={{textAlign:'left'}}>
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="ta的收藏笔记" key="0">{myStarNote}</TabPane>
                            <TabPane tab="ta的收藏论文" key="1">{myStarPaper}</TabPane>
                            <TabPane tab="ta的点赞" key="2">{myLike}</TabPane>
                            <TabPane tab="ta的创作" key="3">{myWrite}</TabPane>
                        </Tabs>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OtherUserPage;
