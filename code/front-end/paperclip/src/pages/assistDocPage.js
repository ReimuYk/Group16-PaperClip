import React, { Component } from 'react';
import { IPaddress } from '../App'
import { List, Avatar, Anchor, Menu, Popconfirm, Divider, Table } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';

var username = '';

class AssistDoc extends Component{
    state = {
        data: [],
        columns: [{
            title: '文档名',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/user/docdetail?docID=" + record.docID}>{text}</a>
            )
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => (
                <Link to={'/viewpage?username=' + record.author}>{record.author}</Link>
            )
        },  {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href={"/user/docdetail?docID=" + record.docID}>查看文档版本</a>
                </span>
            ),
        }],
    }
    componentWillMount = () => {
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
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
                <div style={{width:'60%',marginLeft:'200px', paddingTop:'60px', float:'left'}}>
                    <Table columns={this.state.columns} dataSource={this.state.data} />
                </div>
            </div>
        )
    }
}

export default AssistDoc;
