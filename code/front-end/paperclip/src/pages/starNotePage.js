import React, { Component } from 'react';
import { List, Avatar, Anchor, Menu, Popconfirm, Table, Divider } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'

var username ='';
class StarNote extends Component{
    state = {
        data: [],
        columns: [{
            title: '笔记名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/user/viewNote?noteID=" + record.ID}>{text}</a>
            )
        }, {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) => (
                <a href={"/viewpage?username=" + record.author}>{text}</a>
            )
        },  {
            title: '对应论文',
            dataIndex:'paperTitle',
            key: 'paperTitle'
        },  {
            title: '收藏量',
            dataIndex:'starno',
            key:'starno'
        }, {
            title: '最近修改日期',
            dataIndex:'date',
            key:'date'
        }, {
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
                    alert("取消错误，请重试");
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
            <div style={{width:'60%',marginLeft:'200px', paddingTop:'40px'}}>
                <div style={{width:'915px'}}>
                <p style={{textAlign:'left'}}>
                    <a style={{width:'100px'}}>笔记名称</a>
                    <a style={{width:'40px',marginLeft:'460px'}}>作者</a>
                    <a style={{width:'40px',marginLeft:'63px'}}>收藏量</a>
                    <a style={{width:'70px',marginLeft:'50px'}}>最近修改日期</a>
                    <a style={{wdith:'50px',marginLeft:'80px'}}>操作</a>
                </p>
                </div>
                <List
                    style={{textAlign:'left',width:'915px'}}
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
                        /* 笔记显示页 */
                        title={<a href={'/viewnote?noteID='+item.ID}>{item.title}</a>}
                        description={item.paperTitle + '    |   ' + item.keywords}
                        />
                        <a style={{width:'80px',marginLeft:'20px'}} href={'/viewpage?username=' + item.author}>{item.author}</a>
                        <a style={{width:'80px',marginLeft:'20px'}}>{item.starno}</a>
                        <a style={{width:'80px',marginLeft:'0px'}}>{item.date}</a>
                    </List.Item>
                    )}
                />
                <Table columns={this.state.columns} dataSource={this.state.data} />
            </div>
            </div>
        )
    }
}

export default StarNote;
