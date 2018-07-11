import React, { Component } from 'react';
import { Layout, Icon, Divider, Menu, List, Avatar, Modal, Input, Anchor, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../css/style.css';
import NavBar from '.././components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
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


const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
class OtherUserPage extends Component{
    state = {
        userheader:'',
        selfUsername:'',
        username:'',
        fensno:0,
        userDescription:'',
        visible: false,
        mailContent: '',
        data: usersMoment,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        if(this.state.mailContent == ''){
            alert("内容不能为空！");
            return;
        }
        let that  = this;
        let jsonbody = {};
        jsonbody.hostname = this.state.selfUsername;
        jsonbody.clientname = this.state.username;
        jsonbody.content = this.state.mailContent;
        let url = IPaddress + 'service/sendMessage';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        });
        this.setState({
            visible: false,
        });
        this.clearInput();
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
        this.clearInput();
    }
    componentWillMount = () => {
        var urlUserID = this.props.location.search.substring(10);//username=
        let that = this;
        /* get username */
        this.setState({
            selfUsername: username,
            username: urlUserID
        })
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = this.state.username;
        let url = IPaddress + 'service/clientInfo';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    followUser = () => {
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = this.state.selfUsername;
        jsonbody.clientname = this.state.username;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
                if(result == "fail"){
                    alert("关注失败，请重试");
                }
            }).catch(function(e) {
            console.log("Oops, error");
        })
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
                        <img alt='' src={ this.state.userheader }
                        style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                        />
                    </div>
                    
                    <div id='u1-2'>
                        <br />
                        <br />
                        <br />
                        <h6>{ this.state.username }</h6>
                        <p>{ this.state.userDescription }</p>
                    </div>
                    <div id='u1-3'>
                        <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                        <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary" onClick={this.followUser}><Icon type='plus-square-o' />关注</Button>
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
                                <Menu.Item ID="1"><a>他的动态</a></Menu.Item>
                            </Menu>
                        
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
                </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OtherUserPage;
