import React, { Component } from 'react';
import { Anchor, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { IPaddress} from '../App';

var username='';

class UserFloatMenu extends Component{
    newDoc = () => {
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.title = 'new doc';
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
                    window.location.href='/user/modifyDoc?docID='+result.docID;
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render() {
        username = sessionStorage.getItem('username');
        return(
            <div style={{float:'right',marginRight:'10%',marginTop:'5%'}}>
               
                    <Menu>
                        <Menu.Item>
                            <Link to={'/user/starpaper'}>
                            <span>收藏的论文</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/starnote'}>
                            <span>收藏的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/usernote'}>
                            <span>写过的笔记</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/userdoc'}>
                            <span>写过的文档</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={'/user/assistdoc'}>
                                <span>协作的文档</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                                <span onClick={this.newDoc}>新建文档</span>
                        </Menu.Item>
                    </Menu>
               
            </div>
        )
    }
}

export default UserFloatMenu;