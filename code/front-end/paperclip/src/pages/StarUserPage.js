import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor, message } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */

var username ='';

class StarUser extends Component{
    state = {
        data: [],
    }
    componentWillMount = () => {
        username = sessionStorage.getItem('username');
        let that = this;
        /* get specific info of users */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/starUser';
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
    }
    quitFollow = (record, item) => {
        let that = this;
        /* tell the server to do something */
        let jsonbody = {};
        jsonbody.hostname = username;
        console.log(item);
        jsonbody.clientname = item.username;
        console.log(jsonbody);
        let url = IPaddress + 'service/quitStar/user';
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
                        if(tmpdata[i].username == item.username){
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
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={() => this.quitFollow(this, item)}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ item.avatar } />}
                        title={<a href={"/viewpage?username="+item.username}>{item.username}</a>}
                        />
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default StarUser;
