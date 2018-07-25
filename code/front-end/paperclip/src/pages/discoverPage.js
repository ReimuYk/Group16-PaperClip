import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar, Card, Icon } from 'antd';
import { Row, Col } from 'antd';
import NavBar from '.././components/nav-bar';
import { IPaddress } from '../App'

const Search = Input.Search;
const Option = Select.Option;
var username = '';
var localStorage = '';
var tags = []
var information={
    recommendNote:[],
    recommendPaper:[]
}
class Discover extends Component{
    constructor(props){
        super(props);

        this.changeSearchIdx = this.changeSearchIdx.bind(this);
        this.selectChange = this.selectChange.bind(this);

        this.state = {
            searchIdx: "empty"
        }
    }
    componentWillMount = () =>{
        if((username = sessionStorage.getItem('username'))!=null){
            if((localStorage = window.localStorage.getItem(username))!=null){
                tags = localStorage.split(';');
                tags.pop();
                this.setState({});
            }
        }
    }
    changeSearchIdx(e){
        var idx = e.target.value;
        if(idx == ""){
            idx = "empty";
        }
        this.setState({searchIdx:idx});
    }
    selectChange(value){
        console.log("select idx: " + value);
    }

    renderRecommendNote(){
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
             </span>
        );
        return (
            <div style={{ width:"60%", float: "left", marginBottom: "50px", textAlign:'left'}}>
                <div class="icon" style={{width: "100px", marginBottom: "30px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>推荐笔记</span>
                </div>
                <List
                    span={16}
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={information.recommendNote}
                    renderItem={item => (
                        <Link to={"/viewnote?noteID="+item.noteID}>
                            <List.Item
                                span={16}
                                key={item.title}
                                actions={[<IconText type="star-o" text={item.starno} />, <IconText type="like-o" text={item.likeno} />]}
                            >
                                <List.Item.Meta
                                    title={<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a>}
                                    description={item.keywords}
                                />
                                {item.content}
                            </List.Item>
                        </Link>
                    )}
                />
            </div>
        )
    }

    renderRecommendPaper(){
        return(
            <div style={{ width: "60%"}}>
                <div class="icon" style={{width: "100px", marginBottom: "30px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>推荐论文</span>
                </div>
                <List
                    pagination={{pageSize: 12}}
                    dataSource={information.recommendPaper}
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
            </div>
        )
    }

    renderSideBar(){
        return(
            <div class="sidebar" style={{width: "20%", float: "right", marginRight: "10%", textAlign:'left'}}>
                <div class="icon" style={{width: "130px", marginBottom: "30px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>你可能想搜索</span>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={tags}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href={'/search?content=' + item}>{item}</a>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    render(){
        const recommendNote = this.renderRecommendNote();
        const recommendPaper = this.renderRecommendPaper();
        const sidebar = this.renderSideBar();
        return(
            <div>
                <NavBar />
                <div class="content" style={{width:'100%',marginLeft: "30px", marginTop: "30px", display: "inline-block"}}>
                    {recommendNote}
                    {sidebar}
                    {recommendPaper}
                </div>
            </div>
        )
    }
}

export default Discover;

