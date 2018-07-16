import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFLoatMenu from '../components/userFloatMenu';
/* should get from server */
import { IPaddress } from '../App'

var username = '';
class UserDoc extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get docs according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/userDoc';
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
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.docID = item.ID;
        let url = IPaddress + 'service/delete/doc';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('('+responseJson+')');
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
    newDoc = () => {
        var tmpdata = this.state.data;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.title = '新建文档';
        jsonbody.content='';
        let url = IPaddress + 'service/addDoc';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result != "success"){
                    alert("新建失败，请重试");
                }
                else{
                    let obj={
                        ID: result.docID,
                        title: '新建文档',
                        date: result.date
                    };
                    tmpdata.push(obj);
                    this.setState({
                        data: tmpdata
                    })
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
            
            <UserFLoatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
                <div className="button" style={{width:"100%", height:"50px"}}>
                    <Button style={{float:"right"}} type="primary" onClick={this.newDoc}>新建文档</Button>
                </div>
                <div className="content">
                    <p style={{marginLeft:'490px'}}>上次修改日期</p>
                    <List
                        style={{textAlign:'left'}}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<p>
                                    <Link style={{width:'75px'}} to={"/user/modifyDoc?docID="+item.ID}>编辑文档</Link>
                                    <Link style={{width:'75px', marginLeft:'20px'}} to={"/user/docdetail?docID="+item.ID}>查看文档版本</Link>
                                    <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                                        <a style={{width:'75px',marginLeft:'20px'}}>删除文档</a>
                                    </Popconfirm>
                                </p>]}
                            >
                                <List.Item.Meta
                                    title={<a href={"/user/docdetail?docID="+item.ID}>{item.title}</a>}
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

export default UserDoc;
