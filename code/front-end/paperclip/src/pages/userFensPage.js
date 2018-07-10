import React, { Component } from 'react';
import { List, Avatar, Menu, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import uh from '../statics/uh.jpg'
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
import username from './loginpage';
const userID=1;
const data = [{
    fensName: 'fens 1',
    description: 'description of fens 1',
},{
    fensName: 'fens 2',
    description: 'description of fens 2',
},{
    fensName: 'fens 3',
    description: 'description of fens 3',
},{
    fensName: 'fens 4',
    description: 'description of fens 4',
},{
    fensName: 'fens 5',
    description: 'description of fens 5',
},{
    fensName: 'fens 6',
    description: 'description of fens 6',
},{
    fensName: 'fens 7',
    description: 'description of fens 7',
},{
    fensName: 'fens 8',
    description: 'description of fens 8',
}]

class UserFens extends Component{
    state = {
        data: [],
        username:''
    }
    componentWillMount = () => {
        let that = this;
        /* get username */
        this.setState({
            username: username
        })
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = this.state.username;
        let url = IPaddress + 'service/userFans';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let fans = eval(responseJson);
                that.setState({
                    data:fans
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    follow = (item, record) => {
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = this.state.username;
        jsonbody.clientname = item.username;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
                if(result == "fail"){
                    alert("关注失败，请重试");
                }
             }).catch(function(e) {
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
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item actions={[<a onClick={this.follow.bind(this, item)}>关注</a>]}>
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

export default UserFens;
