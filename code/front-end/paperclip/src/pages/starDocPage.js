import React, { Component } from 'react';
import { IPaddress } from '../App'
import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';

/* should get from server */
import book1 from '../statics/book1.jpg';
import username from './loginpage';
const docs = [{
    ID: 1,
    cover: book1,
    title: 'doc 1',
    author: 'author 1',
    readno: 111,
    starno: 1,
    date: '2018-05-01',
    description: 'description of doc 1',
},{
    ID: 2,
    cover: book1,
    title: 'doc 2',
    author: 'author 2',
    readno: 222,
    starno: 2,
    date: '2018-05-02',
    description: 'description of doc 2',
},{
    ID: 3,
    cover: book1,
    title: 'doc 3',
    author: 'author 3',
    readno: 333,
    starno: 3,
    date: '2018-05-03',
    description: 'description of doc 3',
},{
    ID: 4,
    cover: book1,
    title: 'doc 4',
    author: 'author 4',
    readno: 444,
    starno: 4,
    date: '2018-05-04',
    description: 'description of doc 4',
},{
    ID: 5,
    cover: book1,
    title: 'note 5',
    author: 'author 5',
    readno: 555,
    starno: 5,
    date: '2018-05-05',
    description: 'description of doc 5',
},{
    ID: 6,
    cover: book1,
    title: 'doc 6',
    author: 'author 6',
    readno: 666,
    starno: 6,
    date: '2018-05-06',
    description: 'description of doc 6',
},{
    ID: 7,
    cover: book1,
    title: 'doc 7',
    author: 'author 7',
    readno: 777,
    starno: 7,
    date: '2018-05-07',
    description: 'description of doc 7',
},{
    ID: 8,
    cover: book1,
    title: 'doc 8',
    author: 'author 8',
    readno: 888,
    starno: 8,
    date: '2018-05-08',
    description: 'description of doc 8',
}]
class StarDoc extends Component{
    state = {
        username: '',
        data: []
    }
    componentWillMount = () => {
        this.setState({
            username: username
        })
        let that  = this;
        let jsonbody = {};
        jsonbody.username = username;
        var url = IPaddress + 'service/starDoc';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                console.log(responseJson);
                let data = eval(responseJson);
                that.setState({
                    data:data
                })
            }).catch(function(e){
                console.log("Oops, error");
            })
        /* get specific info of docs */
    }
    quitStar = (record, item) => {
        let that = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.docID = item.ID;
        let url = IPaddress + 'service/quitStar/doc';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
                if(result == "success"){
                    let tmpdata = that.state.data;
                    let dataLen = tmpdata.length;
                    for(let i=0; i<dataLen; i++){
                        if(tmpdata[i].ID == item.ID){
                            tmpdata.splice(i, 1);
                            break;
                        }
                    }
                    that.setState({
                        data: tmpdata,
                    })
                }
                else{
                    alert("删除错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })

        /* send to server, refresh this page in get/post request */
    }
    render(){
        if(sessionStorage.getItem('username') == ''){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
                <NavBar />
                
                <UserFloatMenu />
                <div style={{width:'60%',marginLeft:'200px'}}>
                <div style={{width:'915px'}}>
                <p style={{textAlign:'left'}}>
                    <a style={{width:'100px',marginLeft:'48px'}}>文档名称/描述</a>
                    <a style={{width:'40px',marginLeft:'300px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'53px'}}>阅读量</a>
                    <a style={{width:'40px',marginLeft:'58px'}}>收藏量</a>
                    <a style={{width:'70px',marginLeft:'60px'}}>创作日期</a>
                    <a style={{wdith:'50px',marginLeft:'90px'}}>操作</a>
                </p>
                </div>
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item
                        actions={[<p> 
                            <Popconfirm title="确定取消收藏吗？" onConfirm={() => this.quitStar(this, item)}>
                                <a style={{width:'75px',marginLeft:'20px'}}>取消收藏</a>
                            </Popconfirm>
                        </p>]}>
                        <List.Item.Meta
                        /* 论文显示页 */
                        title={<a href={"/viewdoc?docID="+item.ID}>{item.title}</a>}
                        description={item.keywords}
                        />
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.author}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.readno}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.starno}</a>
                        <a style={{width:'80px',marginLeft:'0px'}}>{item.date}</a>
                        
                    </List.Item>
                    )}
                />
                </div>
            </div>
        )
    }
}

export default StarDoc;
