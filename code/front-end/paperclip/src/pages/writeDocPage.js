import React, { Component } from 'react';
import NavBar from '.././components/nav-bar';
import Editor from '.././components/textEditor';
import {Anchor, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar} from 'antd';
const Search = Input.Search;

class WriteDoc extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags:["key1"],
            inputValue:'',
            inputVisible: false,
            colors:["red","magenta","green","blue","geekblue"],
            invitor:["大哥"],
        }
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addInvitor = this.addInvitor.bind(this);
    }

    handleClose(removedTag){
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags:tags });
    }
    handleInputChange(e){
        this.setState({ inputValue: e.target.value });
    }
    handleInputConfirm = () => {
        var inputValue = this.state.inputValue;
        var tags = this.state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
          tags:tags,
          inputValue: '',
          inputVisible: false
        });
    }
    showInput(){
        this.setState({ inputVisible: true });
    }
    addInvitor(name){
        var invitor = this.state.invitor;
        if (name && invitor.indexOf(name) === -1) {
            invitor = [...invitor, name];
        }
        this.setState({invitor:invitor});
    }

    renderInvitor(){
        var data = this.state.invitor;
        return(
            <div>
                <p>邀请用户来阅读这篇文档，他们将可以为你提出意见。</p>
                <List
                    style = {{width:300}}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        />
                        {item}
                    </List.Item>
                    )}
                />
                <Search
                    placeholder="请输入用户名"
                    onSearch={this.addInvitor}
                    style={{ width: 280 }}
                    enterButton={<Icon type="plus-circle-o" />}
                />
            </div>
        );
    }
    renderKeyTags(){
        var tags = this.state.tags;
        var inputVisible = this.state.inputVisible;
        var inputValue = this.state.inputValue;
        var color = this.state.colors;
        return(
            <div>
                {tags.map((tag,idx) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                    <Tag key={tag} color={color[idx%5]} closable={1} afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                })}
                {inputVisible && (
                <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                />
                )}
                {!inputVisible && (
                <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                    <Icon type="plus" /> New Tag
                </Tag>
                )}
      
          </div>
        );
    }
    renderSideCard(){
        const keyTags = this.renderKeyTags();
        const invitor = this.renderInvitor();
        return(
            <div style={{ width: 160 }}>
                <Popover placement="right" title="邀请" content={invitor} trigger="click">
                    <Button style={{width:150}}><Icon type="usergroup-add" />邀请协作者</Button>
                </Popover><br/>
                <Popover placement="right" title="关键词" content={keyTags} trigger="click">
                    <Button style={{width:150}}><Icon type="plus" />添加关键词</Button>
                </Popover>
                <Button style={{width:150}}>{"保存为草稿"}<Icon type="edit" /></Button>
                <Button style={{width:150}}>{"发布文档"}<Icon type="check" /></Button>
            </div>
        );
    }
    render(){
        const side = this.renderSideCard();
        return(
            <div>
                <NavBar />
                <div className="textEditor" style={{width:"60%",marginLeft:"11%",margintop:"10%",float:"left"}}>
                <input 
                    style={{fontSize:"35px",fontWeight:"bolder",border:"none",outline:"none"}} 
                    placeholder="请输入标题"
                />                
                <Editor initText="<p>空行考核会计哈哈</p>"/>
                </div>
                <Anchor style={{float:"right",marginRight:"8%",marginTop:"4%"}}>
                    {side}
                </Anchor>
            </div>
        )
    }
}

export default WriteDoc;