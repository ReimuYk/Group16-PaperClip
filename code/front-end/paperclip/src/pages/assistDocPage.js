import React, { Component } from 'react';
import { IPaddress } from '../App'
import { List, Avatar, Anchor, Menu, Popconfirm } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';

var username = '';

class AssistDoc extends Component{
    state = {
        data: []
    }
    componentWillMount = () => {
        username = sessionStorage.getItem('username');
        let that  = this;
        let jsonbody = {};
        jsonbody.username = username;
        var url = IPaddress + 'service/contributeDoc';
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
    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
                <NavBar />
                
                <UserFloatMenu />
                <div style={{width:'60%',marginLeft:'200px', paddingTop:'40px'}}>
                <div style={{width:'915px'}}>
                <p style={{textAlign:'left'}}>
                    <a style={{width:'100px'}}>文档名称</a>
                </p>
                </div>
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<a href={"/user/docdetail?docID="+item.docID}>{item.title}</a>}
                        description = {<p>作者：<Link to={'/viewpage?username=' + item.author}>{item.author}</Link></p>}
                        />
                    </List.Item>
                    )}
                />
                </div>
            </div>
        )
    }
}

export default AssistDoc;
