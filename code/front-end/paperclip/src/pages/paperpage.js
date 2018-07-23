import React, { Component } from 'react';
import { Divider ,Modal,Avatar,Checkbox,Icon,Button,Popover,Card, message} from 'antd';
import {Link } from 'react-router-dom';
import Postil from '.././components/postil';
import NavBar from '.././components/nav-bar';
import PDFView from './pdfview';
import NoteList from '.././components/notelist';
import Tool from '.././components/tool';
import emitter from '.././util/events';
import { IPaddress } from '../App'

class Paper extends Component{
    constructor(props){
        super(props);
        this.state={
            paperID:this.props.location.search.substring(9),//9 == 'paperID='.length+1,
            username:sessionStorage.getItem('username'),
            avatar:null
        }
        console.log("paperID:"+this.props.location.search.substring(9));
    }
    componentWillMount(){
        //是否有权限
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = IPaddress+'service/hasAccess';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            if(data.result == "fail"){
                message.error("无浏览权限");
                window.location.href='/';
            }
            console.log(data)
            that.setState({avatar:data.avatar});
        }).catch(function(e){
            console.log("Oops, error");
        })
    }    
    render() {
        return(
            <div style={{position:"relative"}}>
                <NavBar />
                <NoteList paperID={this.state.paperID}/>                
                <PDFView paperID={this.state.paperID}/>        
                <Postil avatar={this.state.avatar}/>
                <br/>
                <Tool paperID={this.state.paperID}/>
            </div>
        )
    }
}

export default Paper;
