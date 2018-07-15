import React, { Component } from 'react';
import { List, Avatar, Popconfirm, Menu, Anchor } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';
import { IPaddress } from '../App'
/* should get from server */
import book1 from '../statics/book1.jpg';
const notes = [{
    ID: 1,
    title: 'note 1',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 1',
},{
    ID: 2,
    title: 'note 2',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 2',
},{
    ID: 3,
    title: 'note 3',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 3',
},{
    ID: 4,
    title: 'note 4',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 4',
},{
    ID: 5,
    title: 'note 5',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 5',
},{
    ID: 6,
    title: 'note 6',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 6',
},{
    ID: 7,
    title: 'note 7',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 7',
},{
    ID: 8,
    title: 'note 8',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 8',
},{
    ID: 9,
    title: 'note 9',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 9',
},{
    ID: 10,
    title: 'note 10',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 10',
},{
    ID: 11,
    title: 'note 11',
    cover: book1,
    date: '2018-07-01',
    description: 'description of note 11',
}]
class UserNote extends Component{
    state = {
        data: [],
        username:''
    }
    componentWillMount = () => {
        let that = this;
        /* get username */
        let username = sessionStorage.getItem('username');
        this.setState({
            username: username
        })
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
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
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
                let result = eval(responseJson);
                if(result == "success"){
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
    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        return(
            <div>
            <NavBar />
            <UserFloatMenu />
            <div style={{width:'60%',marginLeft:'200px'}}>
            <p style={{marginLeft:'465px'}}>上次修改日期</p>
                <List
                    style={{textAlign:'left'}}
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    renderItem={item => (
                    <List.Item actions={[<p>
                                            <a style={{width:'75px'}} href={"modifyNote?ID="+item.ID}>编辑笔记</a>
                                            <Popconfirm title="确定删除吗？" onConfirm={() => this.deleteNote(this, item)}>
                                                <a style={{width:'75px',marginLeft:'20px'}}>删除笔记</a>
                                            </Popconfirm>
                                        </p>]}>
                        <List.Item.Meta
                        avatar={<Avatar src={ book1 } />}
                        title={<a href={"/viewNote?noteID="+item.ID}>{item.title}</a>}
                        description={item.description}
                        />
                        <p>{item.date}</p>
                    </List.Item>
                    )}
                />
            </div>
            </div>
        )
    }
}

export default UserNote;
