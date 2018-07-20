import React, { Component } from 'react';
import { List, Avatar, Anchor, Menu, Popconfirm, Table, Divider, message } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'

var username ='';
class StarNote extends Component{
    state = {
        data: [],
        columns: [{
            align:'center',
            title: '笔记名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/user/viewNote?noteID=" + record.ID}>{text}</a>
            )
        }, {
            align:'center',
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => (
                <a href={"/viewpage?username=" + record.author}>{text}</a>
            )
        },  {
            align:'center',
            title: '对应论文',
            dataIndex:'paperTitle',
            key: 'paperTitle'
        },  {
            align:'center',
            title: '收藏量',
            dataIndex:'starno',
            key:'starno'
        }, {
            align:'center',
            title: '最近修改日期',
            dataIndex:'date',
            key:'date'
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
        /* notes should get from server */
        username = sessionStorage.getItem('username');

        let that = this;
        /* get specific info of notes */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/starNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                data.sort(that.sortArray);
                that.setState({
                    data:data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    quitStar = (record, item) => {
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = item.ID;
        let url = IPaddress + 'service/quitStar/note';
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
                    message.error("取消错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
        /* send to server, refresh this page in get/post request */
    }
    sortArray(obj1, obj2){
        if(obj1.date < obj2.date){
            return 1;
        }
        else if(obj1.date > obj2.date){
            return -1;
        }
        else{
            return 0;
        }
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

export default StarNote;
