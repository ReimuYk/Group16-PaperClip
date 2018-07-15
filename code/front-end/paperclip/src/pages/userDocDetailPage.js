import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor, Button } from 'antd';
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
        author: false
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
                let obj = data.versions[0];
                let result = (obj.author == username);
                that.setState({
                    data: data.versions,
                    author: result
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
                let result = eval('(' + responseJson + ')');
                if(result.result == 'fail'){
                    alert('删除失败，请重试');
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
    renderList(){
        if(this.state.author){
            return(
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
            )
        }
        else{
            return(
                <List
                    style={{textAlign:'left'}}
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a href={"/viewdoc?versionID="+item.versionID}>{item.title}</a>}
                            />
                            <p>{item.date}</p>
                            <p>{item.version}</p>
                        </List.Item>
                    )}
                />
            )
        }

    }
    render(){
        let renderList = this.renderList();
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
                <NavBar />
            
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
                <div className="content">
                    {renderList}
                </div>
            </div>
        </div>
        )
    }
}

export default UserDocDetail;
