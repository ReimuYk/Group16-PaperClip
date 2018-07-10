import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import username from './loginpage';
import UserFloatMenu from '../components/userFloatMenu';
import IPaddress from '../App'
/* should get from server */
import uh from '../statics/uh.jpg';

const data = [{
    userName: 'user 1',
    description: 'description of user 1',
},{
    userName: 'user 2',
    description: 'description of user 2',
},{
    userName: 'user 3',
    description: 'description of user 3',
},{
    userName: 'user 4',
    description: 'description of user 4',
},{
    userName: 'user 5',
    description: 'description of user 5',
},{
    userName: 'user 6',
    description: 'description of user 6',
},{
    userName: 'user 7',
    description: 'description of user 7',
},{
    userName: 'user 8',
    description: 'description of user 8',
}]

class StarUser extends Component{
    state = {
        data: [],
        username:''
    }
    componentWillMount = () => {
        this.setState({
            username: username
        })
        /* get specific info of users */
        let jsonbody = {};
        jsonbody.username = this.state.username;
        let url = IPaddress + 'service/starUser';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                this.setState({
                    data:data
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    quitFollow = (item, record) => {
        /* tell the server to do something */
        let jsonbody = {};
        jsonbody.hostname = this.state.username;
        jsonbody.clientname = item.username;
        let url = IPaddress + 'service/quitStar/doc';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
                if(result == "success"){
                    let that = this;
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
                    alert("删除错误，请重试");
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render(){
        return(
            <div>
            <NavBar />
            
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={this.quitFollow.bind(this, item)}>取消关注</a>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ item.avatar } />}
                        title={<a href={"/user?username="+item.username}>{item.username}</a>}
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
