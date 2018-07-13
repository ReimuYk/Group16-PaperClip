import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, List, Avatar, Button, Spin, Icon, Menu, Anchor } from 'antd';
import NavBar from '../components/nav-bar';
import reqwest from 'reqwest';
import { IPaddress } from '../App'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
const MenuItemGroup = Menu.ItemGroup;

class Sider extends React.Component {
    state = {
        userID: 0,
    }
    componentWillMount = () => {
        /* ask for userID  */
    }
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
        if(sessionStorage.getItem('username') != ''){
            return (
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 300 }}
                >
                    <MenuItemGroup key="g1" title="消息提示">

                        <Menu.Item key="1">
                            <Link to={'/user/starpaper?userID='+this.state.userID}>
                                <Icon type="book" />我收藏的论文<span class="GlobalSideBar-navNumber">2,576</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={'/user?userID='+this.state.userID}>
                                <Icon type="team" />我关注的用户<span class="GlobalSideBar-navNumber">2,576</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3"><Icon type="user-add" />我的邀请<span class="GlobalSideBar-navNumber">2,576</span></Menu.Item>
                        <Menu.Item key="4">
                            <Link to={'/user/message?userID='+this.state.userID}>
                                <Icon type="message" />我的私信<span class="GlobalSideBar-navNumber">2,576</span>
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

class LoadMoreList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                loading: false,
                data: res.results,
            });
        });
    }

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    }

    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : null;
        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </List.Item>
                )}
            />
        );
    }
}
class Home extends Component{
    constructor(props){
        super(props);       
        
    }
    renderSideBar(){
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];
        return(
            <div class="sidebar" style={{width: "20%", float: "right", marginRight: "10%"}}>
                <div class="icon" style={{width: "130px", marginBottom: "30px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>我关注的话题</span>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item actions={[<a>删除</a>]}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
    render(){
        return(
            <div>
                <NavBar />
                <div style={{width:"70%"}}>
                    <div className="content" style={{marginTop:"30px", marginLeft:"100px", float:"left"}}>
                        <div className="starTopic" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你关注的话题：</span>
                        </div>
                        <LoadMoreList/>
                        <div className="starUser" style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你关注的人最近：</span>
                        </div>
                        <LoadMoreList/>
                        <div className="starPaper" style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你收藏的文章最近：</span>
                        </div>
                        <LoadMoreList/>
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

