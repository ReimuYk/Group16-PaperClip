import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor,Tag} from 'antd';
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
            notes:[
                {title:"小黄鸡",intro:"小黄鸡很黄很黄很黄很黄哈哈哈哈哈哈哈哈"},
                {title:"大黄鸡",intro:"大黄鸡更黄"},
                
            ],

        }

    }
    changeInputValue(e){
        this.setState({inputValue:e.target.value});
    }
    handleSearch(value){

    }

    renderKey(){
        return(
            <div style={{textAlign:"left",marginTop:"20%"}}>
                key word:
                {this.state.keyWords.map((key)=>{
                    return(
                        <Tag style={{marginLeft:10}}>{key}</Tag>
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
            style={{width:"20%",height:"500px",float:"left", marginLeft:"2%",
            marginTop:"0",overflowY:"hidden"}}>
                <Anchor style={{position:"fixed",zIndex:"1",backgroundColor:"#FFFFFF"}}>
                    <Search
                    type="textarea"
                    placeholder="input text"
                    enterButton={<Icon type="search" />}
                    size="default"
                    value={this.state.inputValue}
                    onChange={this.changeInputValue}
                    onSearch={this.handleSearch}
                    />   
                </Anchor>
                {keys}
                <Divider />
                {notes}
                <Divider />
                             
          </div>
        );
    }
}

export default NoteList;