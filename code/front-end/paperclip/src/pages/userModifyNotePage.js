import React, { Component } from 'react';
import NavBar from '.././components/nav-bar';
import Editor from '.././components/textEditor';
import {Anchor, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar} from 'antd';
const Search = Input.Search;
/* fake data */
const data = [{
    key: 1,
    title: 'note 1',
    description: 'description of note 1',
},{
    key: 2,
    title: 'note 2',
    description: 'description of note 2',
},{
    key: 3,
    title: 'note 3',
    description: 'description of note 3',
},{
    key: 4,
    title: 'note 4',
    description: 'description of note 4',
},{
    key: 5,
    title: 'note 5',
    description: 'description of note 5',
},{
    key: 6,
    title: 'note 6',
    description: 'description of note 6',
},{
    key: 7,
    title: 'note 7',
    description: 'description of note 7',
},{
    key: 8,
    title: 'note 8',
    description: 'description of note 8',
},{
    key: 9,
    title: 'note 9',
    description: 'description of note 9',
},{
    key: 10,
    title: 'note 10',
    description: 'description of note 10',
},{
    key: 11,
    title: 'note 11',
    description: 'description of note 11',
}]

class ModifyNote extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags:["key1"],
            inputValue:'',
            inputVisible: false,
            colors:["red","magenta","green","blue","geekblue"],
            invitor:["大哥"],
            title: '',
            description: '',
        }
        this.showInput = this.showInput.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputConfirm = this.handleInputConfirm.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addInvitor = this.addInvitor.bind(this);
    }
    componentWillMount = () => {
        var url = window.location.href; 
        var theRequest = new Object();
        if ( url.indexOf( "?" ) != -1 ) {
            var str = url.substr( 1 ); //substr()方法返回从参数值开始到结束的字符串；
            var strs = str.split( "&" );
            for ( var i = 0; i < strs.length; i++ ) {
                theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] );
            }
            var noteKey = this.props.location.search.substring(5);
            console.log('substring', noteKey);//5 == 'key='.length+1 (url: .../modifynote?key=xxx)
            console.log('data[noteKey-1]',data[noteKey-1]);
            /* get content of that note */
            /* here we use fake data */
            this.setState({
                title: data[noteKey-1].title,
                description: data[noteKey-1].description,
            })
        }
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
                <Button style={{width:150}}><Icon type="edit" />{"保存为草稿"}</Button>
                <Button style={{width:150}}><Icon type="check" />{"发布笔记"}</Button>
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
                    style={{fontSize:"35px",fontWeight:"bolder",border:"none",outline:"none",textAlign:'center'}} 
                    defaultValue={this.state.title}
                />                
                <Editor initText={this.state.description} initTitle={this.state.title} />
                </div>
                <Anchor style={{float:"right",marginRight:"8%",marginTop:"4%"}}>
                    {side}
                </Anchor>
            </div>
        )
    }
}

export default ModifyNote;