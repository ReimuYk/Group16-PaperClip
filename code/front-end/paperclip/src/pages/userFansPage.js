import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
/* should get from server */
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'

var username = '';
class UserFans extends Component{
    state = {
        data: []
    }
    componentWillMount = () => {
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/userFans';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let fans = eval('('+responseJson+')');
                that.setState({
                    data:fans
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    /*follow = (record, item) => {
        let that = this;
        /* get data according to username
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = item.username;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('('+responseJson+')');
                if(result == "fail"){
                    alert("关注失败，请重试");
                }
                console.log(result);
             }).catch(function(e) {
            console.log("Oops, error");
        })
    }*/

    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
            <NavBar />
            
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px', padding:'40px'}}>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src={ item.userheader } />}
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

export default UserFans;
