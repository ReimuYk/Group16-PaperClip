import React, { Component } from 'react';
import { Layout, message,Button} from 'antd';
import {Link } from 'react-router-dom';
import Postil from '.././components/postil';
import NavBar from '.././components/nav-bar';
import PDFView from './pdfview';
import NoteList from '.././components/notelist';
import Tool from '.././components/tool';
import emitter from '.././util/events';
import { IPaddress } from '../App'

const { Header, Content, Footer, Sider } = Layout;

class Paper extends Component{
    constructor(props){
        super(props);
        this.onCollapse = this.onCollapse.bind(this);
        this.state={
            paperID:this.props.location.search.substring(9),//9 == 'paperID='.length+1,
            username:sessionStorage.getItem('username'),
            avatar:null,
            collapsed:false
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
            let data = eval('('+responseJson+')');
            if(data.result == "fail"){
                message.error("无浏览权限", 3);
                window.location.href='/';
            }
            console.log(data)
            that.setState({avatar:data.avatar});
        }).catch(function(e){
            console.log("Oops, error");
        })
    }    

    onCollapse(){
        var c = this.state.collapsed;
        this.setState({collapsed:!c});
    }
    render() {
        return(
            <div style={{position:"relative"}}>
                <NavBar />
                <Layout style={{marginTop:"1%"}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                        width="20%"
            
                        collapsedWidth={0}
                        style={{width:"30%",height:"80%",overflowY:"hide",
                        backgroundColor:"white", left:"1%",boxShadow:"0px 1px 3px #BDBCBC",
                        borderRadius:"2px",padding:"10px 20px"}}
                    >
                        <NoteList paperID={this.state.paperID}/>   
                    </Sider>             
                <PDFView paperID={this.state.paperID}/>        
                <Postil avatar={this.state.avatar}/>
                <Tool paperID={this.state.paperID}/>
                </Layout>
            </div>
        )
    }
}

export default Paper;
