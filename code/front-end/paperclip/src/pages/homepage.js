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
            <div className="footer" style={{marginTop:"50px"}}>
                <footer className="Footer">
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="//liukanshan.zhihu.com/">刘看山</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="/question/19581624">知乎指南</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="/terms">知乎协议</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="/terms/privacy">隐私政策</a><br></br>
                    <a className="Footer-item" target="_blank" href="/app">应用</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="https://app.mokahr.com/apply/zhihu">工作</a>
                    <Icon type="minus" />
                    <button type="button" class="Button OrgCreateButton">申请开通知乎机构号</button><br></br>
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="https://zhuanlan.zhihu.com/p/28561671">侵权举报</a>
                    <Icon type="minus" />
                    <a className="Footer-item" target="_blank" rel="noopener noreferrer" href="http://www.12377.cn">网上有害信息举报专区</a><br></br>
                    <span className="Footer-item">违法和不良信息举报：010-82716601</span><br></br>
                    <a className="Footer-item" target="_blank" href="/jubao">儿童色情信息举报专区</a><br></br>
                    <a className="Footer-item" target="_blank" href="/contact">联系我们</a>
                    <span> © 2018 知乎</span>
                </footer>
            </div>
        )
    }
    renderSider(){
        if(sessionStorage.getItem('username') != null){
            return (
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 300 }}
                >
                    <MenuItemGroup key="g1" title="消息提示">

                        <Menu.Item key="1">
                            <Link to={'/user/starpaper?username='+username}>
                                <Icon type="book" />我收藏的论文
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/user?username='+username}>
                                <Icon type="team" />我关注的用户
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
                        <Menu.Item key="5"><Icon type="customer-service" />社区服务中心</Menu.Item>
                    </MenuItemGroup>
                </Menu>
            )
        }
    }
    render() {
        const renderFooter = this.renderFooter();
        const renderSider = this.renderSider();
        return (
            <div className="menu" style={{float: "right", marginRight: "10%", textAlign:"left"}}>
                {renderSider}
                {renderFooter}
            </div>
        );
    }
}

class Home extends Component{
    state = {
        recommendData: [],
        paperData:[]
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
                    paperData: papers
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    renderRecommend = () =>{
        return(
            <List
                pagination={{pageSize: 12}}
                dataSource={this.state.recommendData}
                renderItem={item => (
                    <List.Item
                        actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                    >
                        <List.Item.Meta
                            title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                            description={item.keyword}
                        />
                    </List.Item>
                )}
            />
        )
    }
    renderPersonal = () =>{
        return(
            <List
                pagination={{pageSize: 12}}
                dataSource={this.state.paperData}
                renderItem={item => (
                    <List.Item
                        actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                    >
                        <List.Item.Meta
                            title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                            description={item.keyword}
                        />
                    </List.Item>
                )}
            />
        )
    }
    render(){
        const renderRecommend = this.renderRecommend();
        const renderPersonal = this.renderPersonal();
        return(
            <div>
                <NavBar />
                <div style={{width:"70%"}}>
                    <div className="content" style={{marginTop:"30px", marginLeft:"100px", float:"left"}}>
                        <div className="starTopic" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>编辑推荐：</span>
                        </div>
                        {renderRecommend}
                        <div className="starUser" style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你可能感兴趣：</span>
                        </div>
                        {renderPersonal}
                    </div>
                </div>
                <div className="Menu" style={{marginTop:"150px"}}>
                    <Sider/>
                </div>
            </div>
        )
    }
}

export default Home;

