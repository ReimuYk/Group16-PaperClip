import React, { Component } from 'react';

import { List, Avatar, Anchor, Menu, Popconfirm, Table, message } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'

var username ='';

class StarPaper extends Component{
    state = {
        data: [],
        columns: [{
            align:'center',
            title: '论文名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/paper?paperID=" + record.ID}>{text}</a>
            )
        }, {
            align:'center',
            title: '批注量',
            dataIndex: 'postilno',
            key: 'postilno',
        },  {
            align:'center',
            title: '笔记量',
            dataIndex:'noteno',
            key: 'noteno'
        }, {
            align:'center',
            title:'操作',
            key:'action',
            render: (text, record) => (
                <a onClick={() => this.quitStar(text, record)}>取消收藏</a>
            )
        }],
    }
    componentWillMount = () => {
        username = sessionStorage.getItem('username');
        let that = this;
        /* get specific info of papers */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/starPaper';
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
    }
    quitStar = (record, item) => {
        let that =this;
        /* send to server, refresh this page in get/post request */
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.paperID = item.ID;
        let url = IPaddress + 'service/quitStar/paper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
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
                    message.error("删除错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
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

export default StarPaper;
