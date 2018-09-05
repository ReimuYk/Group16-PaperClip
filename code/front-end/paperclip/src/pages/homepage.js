import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, List, Avatar, Button, Spin, Icon, Menu, Anchor } from 'antd';
import NavBar from '../components/nav-bar';
import reqwest from 'reqwest';
import { IPaddress } from '../App'
const MenuItemGroup = Menu.ItemGroup;
var username = ''
var localStorage =''
var information = {}
class Sider extends React.Component {

    handleClick = (e) => {
        console.log('click ', e);
    }

    renderFooter(){
        return(
            <div className="footer" 
            style={{marginTop:"10px",backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",
            borderRadius:"2px",padding:"0 20px"}}>
                <footer className="Footer">
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >咩咩咩</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >嘤嘤嘤</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >喵喵喵</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >卖萌政策</a><br></br>
                    <a className="Footer-item" target="_blank" >卖萌</a>
                    <Icon type="minus" />
                    <button type="button" class="Button OrgCreateButton">申请开通PaperClip机构号</button><br></br>
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >侵权举报</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" >网上有害信息举报专区</a><br></br>
                    <span className="Footer-item">违法和不良信息举报：18918928257</span><br></br>
                    <a className="Footer-item" target="_blank" >儿童色情信息举报专区</a><br></br>
                    <a className="Footer-item" target="_blank" >联系18918928157</a>
                    <span> © 2018 PaperClip</span>
                </footer>
            </div>
        )
    }
    renderSider(){
        if(sessionStorage.getItem('username') != null){
            return (
                <Menu
                    onClick={this.handleClick}
                    style={{backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",
                    borderRadius:"2px",padding:"0 20px"}}
                >
                    <MenuItemGroup key="g1" title="消息提示">

                        <Menu.Item key="1">
                            <Link to={'/user/starpaper'}>
                                <Icon type="book" />我收藏的论文
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/user/notifications'}>
                                <Icon type="team" />我的通知
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/user/invitations'>
                                <Icon type="user-add" />我的邀请
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to='/user/message'>
                                <Icon type="message" />我的私信
                            </Link>
                        </Menu.Item>
                    </MenuItemGroup>
                </Menu>
            )
        }
    }
    render() {
        const renderFooter = this.renderFooter();
        const renderSider = this.renderSider();
        return (
            <div className="menu" style={{width:"300px",marginRight: "10%", textAlign:"left",display:"block"}}>
                {renderSider}
                {renderFooter}
            </div>
        );
    }
}

class Home extends Component{
    state = {
        recommendData: [],
        paperData:[],
        isLoading:true
    }
    constructor(props){
        super(props);
    }
    componentWillMount = () =>{
        let searchContent = '';
        username = sessionStorage.getItem('username');
        if(username!=null){
            localStorage = window.localStorage.getItem(username);
            if(localStorage != null){
                let tags = localStorage.split(';');
                tags.pop();
                for(var i=0;i<tags.length; ++i){
                    searchContent += tags[i] + ' ';
                }
            }
        }
        /* get info from server */
        let that = this;
        /* get search content according to username */
        let jsonbody = {};
        jsonbody.searchText = searchContent;
        jsonbody.needImg = 1;
        let url = IPaddress + 'service/search';
        let options={};
        console.log(jsonbody);
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                console.log(data);
                let papers = data[0].papers;
                for(var i = 0; i<papers.length; i++){
                    if(papers[i].keyword.length > 50){
                        papers[i].keyword = papers[i].keyword.substring(0,50);
                        papers[i].keyword += '...';
                    }
                    if(papers[i].keyword.length == 0){
                        papers[i].keyword = 'null';
                    }
                }
                that.setState({
                    recommendData: data[1].recommand,
                    paperData: papers,
                    isLoading:false
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    renderRecommend = () =>{
        if (this.state.isLoading){
            return(
                <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
                padding:"16px 20px"}}>
                    <Spin size="large" />
                </div>
            );
        }
        return(
            <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
            padding:"16px 20px"}}>
                <List
                    itemLayout="vertical"
                    pagination={{pageSize: 3}}
                    dataSource={this.state.recommendData}
                    renderItem={item => (
                        <List.Item 
                            key={item.paperID}
                            actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                            extra={<img width={222} height={150} alt="logo" src={item.paperImg} />}
                        >
                            <List.Item.Meta
                                title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                                description={item.abstract}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    renderPersonal = () =>{
        if (this.state.isLoading){
            return(
                <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
                padding:"16px 20px"}}>
                    <Spin size="large" />
                </div>
            );
        }
        return(
            <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
            padding:"16px 20px"}}>
                <List
                    itemLayout="vertical"
                    pagination={{pageSize: 5}}
                    dataSource={this.state.paperData}
                    renderItem={item => (
                        <List.Item
                            actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                            extra={<img width={222} height={150} alt="logo" src={item.paperImg} />}
                        >
                            <List.Item.Meta
                                title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                                description={item.abstract}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    render(){
        const renderRecommend = this.renderRecommend();
        const renderPersonal = this.renderPersonal();
        return(
            <div>
                <NavBar />
                <div style={{display:"flex"}}>
                    <div style={{width:"70%",display:"block"}}>
                        <div className="content" 
                        style={{marginTop:"30px",position:"relative",left:"13%",display:"block",width:"83%",
                        }}>
                            <div className="starTopic" 
                            style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"
                            ,backgroundColor:"white",lineHeight:"50px",boxShadow:"0px 1px 3px #BDBCBC",
                            borderRadius:"2px",padding:"0 20px"}}>
                            <Icon type="star" style={{color:"#FFD700",fontSize:"16px"}}/>
                            <span style={{marginLeft: "10px",fontFamily:"Microsoft Yahei",fontSize:"17px"}}>{" 编辑推荐："}</span>
                            </div>
                            {renderRecommend}
                            <div className="starUser" 
                            style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"
                            ,backgroundColor:"white",lineHeight:"50px",boxShadow:"0px 1px 3px #BDBCBC",
                            borderRadius:"2px",padding:"0 20px"}}>
                            <Icon type="heart" style={{color:"	#FFB6C1",fontSize:"16px"}}/>
                            <span style={{marginLeft: "10px",fontFamily:"Microsoft Yahei",fontSize:"17px"}}>{" 你可能感兴趣："}</span>
                            </div>
                            {renderPersonal}
                        </div>
                    </div>
                    <div className="Menu" style={{marginTop:"30px",position:"fixed",right:"7%"}}>
                        <Sider/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

