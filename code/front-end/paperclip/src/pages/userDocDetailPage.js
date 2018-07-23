import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button, Divider, Table, message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
/* should get from server */
import { IPaddress } from '../App'

var username ='';
var docID = 0;

class UserDocDetail extends Component{
    state = {
        data: [],
        author: false,
        columns1: [{
            align:'center',
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/paper?paperID=" + record.docPdfID}>{text}</a>
            )
        }, {
            align:'center',
            title: '版本',
            dataIndex: 'version',
            key: 'version',
        },  {
            align:'center',
            title: '发布日期',
            dataIndex:'date',
            key: 'date'
        }, {
            align:'center',
            title:'操作',
            key:'action',
            render: (text, record) => (
                <a href={"/paper?paperID=" + record.docPdfID}>查看内容</a>
            )
        }],
        columns2: [{
            align:'center',
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <a href={"/paper?paperID=" + record.docPdfID}>{text}</a>
            )
        }, {
            align:'center',
            title: '版本',
            dataIndex: 'version',
            key: 'version',
        },  {
            align:'center',
            title: '发布日期',
            dataIndex:'date',
            key: 'date'
        }, {
            align:'center',
            title:'操作',
            key:'action',
            render: (text, record) => (
            <span>
                <a href={"/paper?paperID=" + record.docPdfID}>查看内容</a>
                <Divider type="vertical" />
                <a onClick={() => this.deleteDoc(record)}>删除该版本</a>
            </span>
            )
        }],
    }
    componentWillMount = () => {
        docID = this.props.location.search.substring(7);//7 == 'docID='.length+1
        username = sessionStorage.getItem('username');
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.docID = docID;
        let url = IPaddress + 'service/userDocDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                if(data.result == 'fail'){
                    window.location.href = '/user';
                    return;
                }
                if(data.version.length > 0){
                    let obj = data.version[0];
                    let result = (obj.author == username);
                    data.version.sort(that.sortArray);
                    that.setState({
                        data: data.version,
                        author: result
                    })
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    deleteDoc = (record, item) => {
        let that = this;
        /* get username */
        /* get docs according to username */
        let jsonbody = {};
        jsonbody.versionID = item.docPdfID;
        jsonbody.username = username;
        console.log(jsonbody);
        let url = IPaddress + 'service/delete/docVersion';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == 'fail'){
                    message.error('删除失败，请重试', 3);
                    return;
                }
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
    renderList(){
        if(this.state.data.length == 0){
            return(
                <p>没有任何文档版本</p>
            )
        }
        if(this.state.author){
            return(
                <div className="content">
                    <a style={{marginLeft:'400px'}}>修改日期</a>
                    <List
                        style={{textAlign:'left'}}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item
                                actions={[<p>
                                    <a style={{width:'75px'}} href={"/paper?paperID="+item.docPdfID}>查看内容</a>
                                    <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteDoc(this, item)}>
                                        <a style={{width:'75px',marginLeft:'20px'}}>删除该版本</a>
                                    </Popconfirm>
                                </p>]}
                            >
                                <List.Item.Meta
                                    title={<a href={"/paper?paperID="+item.docPdfID}>{item.title}</a>}
                                    description={'版本 ' + item.version}
                                />
                                <p>{item.date}</p>
                            </List.Item>
                        )}
                    />
                </div>
            )
        }
        else{
            return(
                <div className="content">
                    <a style={{marginLeft:'850px'}}>修改日期</a>
                    <List
                        style={{textAlign:'left'}}
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href={"/paper?paperID="+item.docPdfID}>{item.title}</a>}
                                    description={'版本 ' + item.version }
                                />
                                <p>{item.date}</p>
                            </List.Item>
                        )}
                    />
                </div>
            )
        }

    }
    renderTable(){
        if(this.state.author){
            return(
                <Table columns={this.state.columns2} dataSource={this.state.data} />
            )
        }
        else{
            return(
                <Table columns={this.state.columns1} dataSource={this.state.data} />
            )
        }
    }
    render(){
        let renderList = this.renderList();
        let renderTable = this.renderTable();
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
                <NavBar />
            
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px', paddingTop:'60px', float:'left'}}>
                {renderTable}
            </div>
        </div>
        )
    }
}

export default UserDocDetail;
