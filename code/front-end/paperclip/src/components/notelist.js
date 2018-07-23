import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor,Tag} from 'antd';
import emitter from '.././util/events';
import {Link } from 'react-router-dom';
import { IPaddress } from '../App';

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
            that.setState({
                type:result.type,
                data:result.data
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
            <div style={{textAlign:"left",marginTop:"5%"}}>
                key word:
                {this.state.keyWords.map((key,idx)=>{
                    return(
                        <Tag key={idx} style={{marginLeft:10}}>{key}</Tag>
                    )
                },this)}
            </div>
        );
    }
    
    renderNotes(){
        return(
            <List
                style={{textAlign:"left"}}
                header={<div><Icon type="bars" />{this.state.type=="note"?"相关笔记":"版本列表"}</div>}
                bordered={false}
                dataSource={this.state.data}
                renderItem={item => (
                    <Link to={this.state.type=="note"?'viewNote?noteID='+item.id:'paper?paperID='+item.id}><List.Item>                       
                        <List.Item.Meta          
                        title={item.title}
                        description={<div dangerouslySetInnerHTML={{ __html: item.intro}}></div>}
                        />
                    </List.Item>
                    </Link>
                    )}
                />
        );
    }
    render() {
        const keys = this.state.type == "note"?this.renderKey():<div></div>;
        const notes = this.renderNotes();
        return(
            <div id="notelist" 
            style={{position:"fixed",width:"18%",height:"80%",overflowY:"scroll",
            left:"2%"}}>
                
                <div>
                    {keys}
                    <Divider />
                    {notes}
                    <Divider />
                </div>          
          </div>
        );
    }
}

export default NoteList;