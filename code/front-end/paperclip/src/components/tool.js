import React, { Component } from 'react';
import { Divider ,Modal,Avatar,Checkbox,Icon,Button,Popover,Card, message} from 'antd';
import {Link } from 'react-router-dom';
import emitter from '.././util/events'
import { IPaddress } from '../App';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
const CheckboxGroup = Checkbox.Group;


class Tool extends Component{
    constructor(props){
        super(props);

        this.star = this.star.bind(this);
        this.openDownload = this.openDownload.bind(this);
        this.downloadCheck = this.downloadCheck.bind(this);
        this.cancelDownload = this.cancelDownload.bind(this);
        this.confirmDownload = this.confirmDownload.bind(this);
        this.openShare = this.openShare.bind(this);
        this.cancelShare = this.cancelShare.bind(this);
        this.confirmShare = this.confirmShare.bind(this);
        this.newNote = this.newNote.bind(this);

        this.state={
            paperID:this.props.paperID,
            username:sessionStorage.getItem('username'),
            toolIdx:null,
            isStar:false,
            clickTool:false,
            type:"note",
            downloadOption:"paperAndPostil"
        }
    }
    componentWillMount(){
        //是否收藏过
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = IPaddress+'service/ifStar';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            let data = eval('('+responseJson+')');
            if(data.result == "fail"){
                message.error("您没有收藏该论文", 3);
            }
            else{
                that.setState({
                    isStar:data.ifStar
                })
            }
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    componentDidMount() {
        this.Event = emitter.addListener('hide', (type) => {
            this.setState({
                type:type
            });
        });
    }
    starPaper(){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = IPaddress+'service/starThePaper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            let data = eval('('+responseJson+')');
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    quitStarPaper(){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = IPaddress+'service/quitStar/paper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            let data = eval('('+responseJson+')');
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    star(){
        var star = this.state.isStar;
        this.setState({isStar:!star});
        if(!star){
            this.starPaper();
        }
        else{
            this.quitStarPaper();
        }
    }
    downloadCheck=(e)=>{
        console.log(e.target.value);
        this.setState({downloadOption:e.target.value},()=>{this.openDownload()});
    }
    confirmDownload(){
        console.log("ok");
        this.setState({clickTool:false});
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = IPaddress+'service/exportPaper';
        let options={};
        options.method='POST';
        options.headers={'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.blob()
        .then(responseFile=>{
            var a = document.createElement('a'); 
            var url = window.URL.createObjectURL(responseFile); 
            a.href = url;
            a.download = that.state.username+"-paper"+that.state.paperID.toString()+".pdf";
            a.click();
            window.URL.revokeObjectURL(url);
            console.log("download success");
        }).catch(function(e){
            console.log("Oops, error");
        }))
    }
    cancelDownload(){
        console.log("cancel");
        this.setState({clickTool:false});
    }
    openDownload(){
        if(this.state.clickTool){
            return;
        }
        this.setState({clickTool:true})
        let content = (
            <div>
                <span>导出设置：</span>
                <RadioGroup onChange={this.downloadCheck}>
                    <Radio value="paperOnly">仅论文</Radio>
                    <Radio value="paperAndPostil">论文及标记的批注</Radio>    
                </RadioGroup>
            </div>
          )
          console.log("我变了")
        confirm({
            title: '导出设置',
            content: content,
            iconType:"setting",
            onOk:this.confirmDownload,
            onCancel:this.cancelDownload
        });        
    }
    confirmShare(){
        console.log("ok");
        this.setState({clickTool:false});        
    }
    cancelShare(){
        console.log("cancel");
        this.setState({clickTool:false});
    }
    openShare(){
        if(this.state.clickTool){
            return;
        }
        this.setState({clickTool:true})
        var content = window.location.href;
        var oInput = document.createElement('input');
        oInput.value = content;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        document.body.removeChild (oInput);
        message.success('复制链接成功', 3);
    }
    newNote(e){
        e.preventDefault();
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        let url = IPaddress + 'service/addNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                window.location.href='/user/modifyNote?noteID='+result.noteID;
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    rederToolContent(){
        return(
            <Card style={{ width: 240,height:90 }}>
                <Button shape="circle" icon="download" 
                onMouseEnter={()=>{this.setState({toolIdx:0})}} onMouseLeave={()=>{this.setState({toolIdx:null})}}
                onClick={this.openDownload} />
                <Divider type="vertical"/>
                <Button type={this.state.isStar?"primary":"default"} shape="circle" icon="star" 
                onMouseEnter={()=>{this.setState({toolIdx:1})}} onMouseLeave={()=>{this.setState({toolIdx:null})}}
                onClick={this.star}/>
                <Divider type="vertical" />
                <Button shape="circle" icon="fork" 
                onMouseEnter={()=>{this.setState({toolIdx:2})}} onMouseLeave={()=>{this.setState({toolIdx:null})}}
                onClick={this.openShare}/>
                <Divider type="vertical" />
                <Button shape="circle" icon="edit"
                onMouseEnter={()=>{this.setState({toolIdx:3})}} onMouseLeave={()=>{this.setState({toolIdx:null})}}
                onClick={this.newNote}>
                </Button>
                <br/>
                <div style={{marginTop:10}}>
                    <span style={{marginLeft:"2%"}}>{this.state.toolIdx==0?"导出":""}</span>
                    <span style={{marginLeft:"25%"}}>{this.state.toolIdx==1?(this.state.isStar?"取消":"收藏"):""}</span>
                    <span style={{marginLeft:"25%"}}>{this.state.toolIdx==2?"分享":""}</span>
                    <span style={{marginLeft:"25%"}}>{this.state.toolIdx==3?"写笔记":""}</span>
                </div>
            </Card>
        );
    }
    render(){
        const content = this.rederToolContent();
        if(this.state.type != "note"){
            return(<div/>);
        }
        return(
            <div id="tool" style={{zIndex:"100", position:"fixed",bottom:"5%",left:"2%"}}>
            <Popover 
            placement="topRight" content={content} trigger="click">
                <Button type="primary">
                <Icon type="tool" />Tool</Button>
            </Popover>
            </div>
        );
    }
}

export default Tool;
