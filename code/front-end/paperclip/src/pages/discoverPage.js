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
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        let url = IPaddress + 'service/recommendNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                information.recommendNote = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
        url = IPaddress + 'service/recommendPaper';
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                information.recommendPaper = data;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
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
            <div style={{ width: "90%", textAlign:'left', marginLeft:'40px'}}>
            <div class="icon" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"
                ,backgroundColor:"white",lineHeight:"50px",boxShadow:"0px 1px 3px #BDBCBC",
                 borderRadius:"2px",padding:"0 20px"}}>
                <Icon type="rocket" style={{fontSize:"16px",color:"#F08080"}}/>
                <span style={{marginLeft: "10px",fontFamily:"Microsoft Yahei",fontSize:"17px"}}>热门笔记</span>
            </div>
            <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
            padding:"16px 20px"}}>
            <List
                itemLayout="vertical"
                pagination={{pageSize: 3}}
                dataSource={information.recommendNote}
                renderItem={item => (
                    <List.Item
                        key={item.noteID}
                        actions={[<IconText type="star-o" text={item.starno} />, <IconText type="like-o" text={item.likeno} />]}
                        extra={<img width={160} height={100} alt="logo" src={item.noteImg} />}
                    >
                        <List.Item.Meta
                            title={<a href={'/viewnote?noteID=' + item.noteID}>{item.title}</a>}
                            description={item.author}
                        />
                    </List.Item>
                )}
            />
            </div>
        </div>
        )
    }

    renderRecommendPaper(){
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
             </span>
        );
        return(
            <div style={{ width: "90%", textAlign:'left', marginLeft:'40px'}}>
                <div class="icon" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"
                    ,backgroundColor:"white",lineHeight:"50px",boxShadow:"0px 1px 3px #BDBCBC",
                     borderRadius:"2px",padding:"0 20px"}}>
                    <Icon type="smile" style={{color:"	#5F9EA0"}}/>
                    <span style={{marginLeft: "10px",fontFamily:"Microsoft Yahei",fontSize:"17px"}}>热门论文</span>
                </div>
                <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
                padding:"16px 20px"}}>
                <List
                    itemLayout="vertical"
                    pagination={{pageSize: 12}}
                    dataSource={information.recommendPaper}
                    renderItem={item => (
                        <List.Item
                            actions={[<IconText type="star-o" text={item.starno} />, <IconText type="edit" text={item.noteno} />]}
                            extra={<img width={160} height={100} alt="logo" src={item.paperImg} />}
                            >
                            <List.Item.Meta
                                title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                                description={item.author}
                            />
                        </List.Item>
                    )}
                />
                </div>
            </div>
        )
    }

    renderSideBar(){
        return(
            <div class="sidebar" style={{marginRight: "10%", textAlign:'left'}}>
                <div class="icon" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"
                    ,backgroundColor:"white",lineHeight:"50px",boxShadow:"0px 1px 3px #BDBCBC",
                     borderRadius:"2px",padding:"0 20px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>你可能想搜索</span>
                </div>
                <div style={{textAlign:'left',backgroundColor:"white",boxShadow:"0px 1px 3px #BDBCBC",borderRadius:"2px",
                padding:"16px 20px"}}>
                <List
                    itemLayout="horizontal"
                    dataSource={tags}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href={'/search?content=' + item}>
                                <Icon type="tag" style={{ fontSize: 16, color: '#4682B4'}}/>{item}</a>}
                            />
                        </List.Item>
                    )}
                />
                </div>
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
                <div class="content" style={{width:'100%',marginLeft: "30px", marginTop: "30px", display: "flex"}}>
                    <div style={{display:"block",width:"62%",marginLeft:"5%"}}>
                        {recommendNote}
                        {recommendPaper}
                    </div>
                    <div style={{display:"block",width:"25%"}}>
                    {sidebar}
                    </div>
                </div>
            </div>
        )
    }
}

export default Discover;

