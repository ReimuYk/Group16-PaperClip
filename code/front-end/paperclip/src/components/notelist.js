import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor,Tag} from 'antd';
import emitter from '.././util/events';
import { IPaddress } from '../App';

const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;


class NoteList extends Component{  
    constructor(props){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);

        this.state = {
            inputValue:"",
            keyWords:["宇宙和平","世界"],
            notes:[],
        }
    }
    componentWillMount(){
        let that  = this;
        //get NoteList
        let jsonbody = {};
        jsonbody.paperID = this.props.paperID;
        var url = IPaddress+'/service/getNoteList';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            that.setState({notes:data});
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })

        //get keywords
        jsonbody = {};
        jsonbody.paperID = this.props.paperID;
        var url = IPaddress+'/service/getKeywords';        
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
    /*componentDidMount() {
        this.noteEvent = emitter.addListener('changeNoteList', (keyWordData,noteData) => {
            //alert("notelist change!");
            this.setState({
                keyWords:keyWordData,
                notes:noteData
            })
        });
    }
    componentWillUnmount() {
        //emitter.removeListener(this.noteEvent);
    }*/
    changeInputValue(e){
        this.setState({inputValue:e.target.value});
    }
    handleSearch(value){

    }

    renderKey(){
        return(
            <div style={{textAlign:"left",marginTop:"20%"}}>
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
                header={<div><Icon type="bars" />相关笔记</div>}
                bordered={false}
                dataSource={this.state.notes}
                renderItem={item => (
                    <a href="#"><List.Item>                       
                        <List.Item.Meta          
                        title={item.title}
                        description={item.intro}
                        />
                    </List.Item></a>
                    )}
                />
        );
    }
    render() {
        const keys = this.renderKey();
        const notes = this.renderNotes();
        return(
            <div id="notelist" 
            style={{position:"fixed",width:"18%",height:"500px",overflowY:"hidden",
            left:"2%"}}>
                <div style={{zIndex:"1",backgroundColor:"#FFFFFF"}}>
                    <Search
                    type="textarea"
                    placeholder="search"
                    enterButton={<Icon type="search" />}
                    size="default"
                    value={this.state.inputValue}
                    onChange={this.changeInputValue}
                    onSearch={this.handleSearch}
                    />   
                </div>
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