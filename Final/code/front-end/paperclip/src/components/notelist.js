import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Card,Divider,Anchor,Tag} from 'antd';
import emitter from '.././util/events';
import {Link } from 'react-router-dom';
import { IPaddress } from '../App';
const CheckableTag = Tag.CheckableTag;
const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;


class NoteList extends Component{  
    constructor(props){
        super(props);

        this.changeInputValue = this.changeInputValue.bind(this);

        this.state = {
            inputValue:"",
            keyWords:["宇宙和平","世界"],
            data:[],
            type:"",
            info:null
        }
    }
    componentWillMount(){
        let that  = this;
        //get NoteList or versionList
        let jsonbody = {};
        jsonbody.paperID = this.props.paperID;
        var url = IPaddress+'service/getNoteList';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let result = eval('('+responseJson+')');
            emitter.emit('hide',result.type);
            that.setState({
                type:result.type,
                data:result.data,
                info:result.info
            });
            console.log(result);
        }).catch(function(e){
            console.log("Oops, error");
        })

        //get keywords
        jsonbody = {};
        jsonbody.paperID = this.props.paperID;
        var url = IPaddress+'service/getKeywords';        
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            that.setState({keyWords:data});
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    
    changeInputValue(e){
        this.setState({inputValue:e.target.value});
    }

    renderKey(){
        return(
            <div style={{textAlign:"left"}}>
                <p><Icon type="key" />关键词</p>
                <Divider />
                {this.state.keyWords.map((key,idx)=>{
                    if(key != ""){
                        return(
                            <Tag key={idx} style={{marginLeft:2,marginBottom:5}} color="#1E90FF">{key}</Tag>
                        );
                    }
                },this)}
            </div>
        );
    }
    
    renderNotes(){
        return(
            <List
                style={{textAlign:"left"}}
                pagination={{pageSize: 4}}
                header={<div><Icon type="bars" />{this.state.type=="note"?"相关笔记":"版本列表"}</div>}
                bordered={false}
                dataSource={this.state.data}
                renderItem={item => (
                    <a href={this.state.type=="note"?'viewNote?noteID='+item.id:'paper?paperID='+item.id}><List.Item>                       
                        <List.Item.Meta          
                        title={item.title}
                        description={<div dangerouslySetInnerHTML={{ __html: item.intro}}></div>}
                        />
                    </List.Item>
                    </a>
                    )}
                />
        );
    }
    renderInfo(){
        var info = this.state.info;
        return(
            <div style={{textAlign:"left",marginTop:"5%"}}>
                <span><Icon type="profile" />论文信息</span>
                <br/>
                <Divider />
                <p><a href='#' style={{fontWeight:"bold"}}>{"Title: "}</a>{info.title}</p>
                    <p><a href='#'  style={{fontWeight:"bold"}}>{"Author: "}</a>{info.author}</p>
                <p><a href='#'  style={{fontWeight:"bold"}}>{"Publish year: "}</a>{info.year}</p>
                <p><a href='#'  style={{fontWeight:"bold"}}>{"Source: "}</a>{info.source}</p>
            </div>
        )
    }
    render() {
        const keys = this.state.type == "note"?this.renderKey():<div></div>;
        const info = this.state.type == "note"?this.renderInfo():<div></div>;
        const notes = this.renderNotes();
        return(
            <div id="notelist" >              
                    {info}
                    <Divider />
                    {keys}
                    <Divider />
                    {notes}
                    <Divider />        
          </div>
        );
    }
}

export default NoteList;