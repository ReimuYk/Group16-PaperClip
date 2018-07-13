import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import {username} from './loginpage';
import UserFloatMenu from '../components/userFloatMenu';
/* should get from server */
import book1 from '../statics/book1.jpg';
import { IPaddress } from '../App'
const docs = [{
    ID: 1,
    title: 'doc 1',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 1',
},{
    ID: 2,
    title: 'doc 2',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 2',
},{
    ID: 3,
    title: 'doc 3',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 3',
},{
    ID: 4,
    title: 'doc 4',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 4',
},{
    ID: 5,
    title: 'doc 5',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 5',
},{
    ID: 6,
    title: 'doc 6',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 6',
},{
    ID: 7,
    title: 'doc 7',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 7',
},{
    ID: 8,
    title: 'doc 8',
    cover: book1,
    date: '2018-07-01',
    description: 'description of doc 8',
}]

class UserDocDetail extends Component{
    state = {
        data: [],
        username:'',
        docID:0
    }
    componentWillMount = () => {
        var urlDocID = this.props.location.search.substring(7);//7 == 'docID='.length+1
        let that = this;
        /* get username */
        this.setState({
            username: username,
            docID: urlDocID
        })
        /* get docs according to username */
        let jsonbody = {};
        jsonbody.username = username;
        console.log(username);
        jsonbody.docID = urlDocID;
        let url = IPaddress + 'service/userDocDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                that.setState({
                    data: data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    deleteDoc = (record, item) => {
        let that = this;
        /* get username */
        /* get docs according to username */
        let jsonbody = {};
        jsonbody.versionID = item.versionID;
        jsonbody.username = username;
        let url = IPaddress + 'service/delete/docVersion';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                var tmpdata = that.state.data;
                var dataLen = tmpdata.length;
                for(let i=0; i<dataLen; i++){
                    if(tmpdata[i].ID == item.ID){
                        tmpdata.splice(i, 1);
                        break;
                    }
                }
                that.setState({
                    data: tmpdata,
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
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
                <div className="content">
                    <List
                        style={{textAlign:'left'}}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<p>
                                    <a style={{width:'75px'}} href={"/user/paperpage?ID="+item.ID}>查看内容</a>
                                    <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                                        <a style={{width:'75px',marginLeft:'20px'}}>删除该版本</a>
                                    </Popconfirm>
                                </p>]}
                            >
                                <List.Item.Meta
                                    title={<a href={"/viewdoc?versionID="+item.versionID}>{item.title}</a>}
                                />
                                <p>{item.date}</p>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
        )
    }
}

export default UserDocDetail;
