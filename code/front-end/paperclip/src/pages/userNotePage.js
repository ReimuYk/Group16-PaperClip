import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Table, Divider, message } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
var username = '';


class UserNote extends Component{
    state = {
        data: [],
        columns: [{
            align:'center',
            title: '笔记名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={'/viewnote?noteID=' + record.ID}>{text}</a>
            )
        },  {
            align:'center',
            title: '最近修改日期',
            dataIndex:'date',
            key:'date'
        }, {
            align:'center',
            title: '对应论文',
            dataIndex:'paperTitle1',
            key: 'paperTitle1',
            render: (text, record) => (
                <a href={"/paper?paperID=" + record.paperID}>{text}</a>
            )
        }, {
            align:'center',
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
    /*autodivheight() {
    //获取浏览器窗口高度
    var winHeight=0;
    if (window.innerHeight)
        winHeight = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
    //通过深入Document内部对body进行检测，获取浏览器窗口高度
    else if (document.documentElement && document.documentElement.clientHeight)
        winHeight = document.documentElement.clientHeight;
    //DIV高度为浏览器窗口的高度
    document.getElementById("userNotePage").style.height= winHeight +"px";
}*/
    componentWillMount = () => {
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        //window.onresize=this.autodivheight; //浏览器窗口发生变化时同时变化DIV高度
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
                console.log(data);
                for(var i=0;i<data.length;++i){
                    if(data[i].paperTitle.length > 10){
                        data[i].paperTitle1 = data[i].paperTitle.substring(0,7) + '...';
                    }
                    else{
                        data[i].paperTitle1 = data[i].paperTitle;
                    }
                }
                data.sort(that.sortArray);
                that.setState({
                    data: data
                })
            })//.catch(function(e){
            //console.log("Oops, error");
        //})
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
                    message.error("删除错误，请重试", 3);
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
            <div id="userNotePage">
            <NavBar />
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px', paddingTop:'60px', float:'left'}}>
                <Table
                    expandedRowRender={record => <p style={{ margin: 0 }}>论文名称：<Link to={'/paper?paperID=' + record.paperID}>{record.paperTitle}</Link></p>}
                    columns={this.state.columns}
                    dataSource={this.state.data} />
            </div>
            </div>
        )
    }
}

export default UserNote;
