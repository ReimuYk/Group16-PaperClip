import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Table, Divider } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
var username = '';

class UserNote extends Component{
    state = {
        data: [],
        columns: [{
            title: '笔记名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={'/viewnote?noteID=' + record.ID}>{text}</a>
            )
        },  {
            title: '最近修改日期',
            dataIndex:'date',
            key:'date'
        }, {
            title:'操作',
            key:'action',
            render: (text, record) => (
                <span>
                    <a href={"/user/modifyNote?noteID=" + record.ID}>编辑笔记</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.deleteNote(text, record)}>删除笔记</a>
                </span>
            )
        }]
    }
    componentWillMount = () => {
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');

        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/userNote';
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
                    data: data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    deleteNote = (record, item) => {
        /* send to server, refresh this page in get/post request */
        let that = this;
        let jsonbody = {};
        jsonbody.noteID = item.ID;
        let url = IPaddress + 'service/delete/note';
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
                    alert("删除错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
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

export default UserNote;
