import React, { Component } from 'react';
import Editor from '.././components/textEditor';
import {Popconfirm, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar, Menu, Modal} from 'antd';
import { IPaddress } from '../App'
const Search = Input.Search;

const information = {
    key: 0,
    title:'',
    tags:["key1"],
    initContent:'',
    invitor:[
        {
            username:'大哥'
        },
        {
            username:'大嫂'
        }
    ]
}

class Header extends React.Component {
    state = {
        loading: false,
        visible: false,
        popoverVisible: false,
        tags:["key1"],
        inputValue:'',
        inputVisible: false,
        colors:["red","magenta","green","blue","geekblue"],
        invitor:[]
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
            /* get content of that note */
            /* here we use fake data */
            this.setState({
                tags: information.tags,
                invitor:information.invitor
            })
        }
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags:tags });
    }

    handleInputChange = (e) => {
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
            inputVisible: false,
        });
    }

    showInput = () =>{
        this.setState({
            inputVisible: true
        });
    }

    renderKeyTags(){
        var tags = this.state.tags;
        var inputVisible = this.state.inputVisible;
        var inputValue = this.state.inputValue;
        var color = this.state.colors;
        return(
            <div>
                <div className="content">
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
                <div className="button" style={{marginTop:"15px"}}>
                    <a onClick={this.publish}>发布</a>
                </div>
            </div>
        );
    }

    handleVisibleChange = (popoverVisible) => {
        this.setState({ popoverVisible });
    }

    publish = () => {
        this.setState({
            popoverVisible: false,
        });
        alert("发布成功！");
    }


    confirmLeave(){
        alert('跳转到首页');
    }
    cancelLeave(){
    }
    render(){
        const tags = this.renderKeyTags();
        return (
            <div className="menuHeader">
                <Menu
                    mode="horizontal"
                >
                    <Menu.Item key="index">
                        <Popconfirm placement="bottomLeft" title="跳回首页可能会丢失您现在的编辑，您确定要跳转吗？" onConfirm={this.confirmLeave} onCancel={this.cancelLeave} okText="Yes" cancelText="No">
                            <span>PaperClip</span>
                        </Popconfirm>
                    </Menu.Item>
                    <Popover
                        content={tags}
                        title="给你的笔记添加关键词"
                        trigger="click"
                        visible={this.state.popoverVisible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Button type="primary" style={{float:"right", right:"100px", top:"8px"}}>发布</Button>
                    </Popover>
                </Menu>
            </div>
        );
    }
}
class ModifyNote extends Component{
    state = {
        title:'',
        initContent:''
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
            /* get content of that note */
            /* here we use fake data */
            this.setState({
                title: information.title,
                initContent: information.initContent
            })
        }
    }
    render(){

        return(
            <div>
                <Header />
                <div className="textEditor" style={{width:"60%", marginLeft:"20%", marginTop:"70px"}}>
                    <input
                        style={{fontSize:"35px",fontWeight:"bolder",border:"none",outline:"none", textAlign:"center"}}
                        placeholder="请输入标题"
                    />
                    <div className="editor" style={{marginTop:"30px"}}>
                        <Editor initText={<p>{this.state.initContent}</p>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModifyNote;