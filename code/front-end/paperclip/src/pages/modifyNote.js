import React, { Component } from 'react';
import {Popconfirm, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar, Menu, Modal, message} from 'antd';
import { IPaddress } from '../App'
import  { Redirect, Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Search = Input.Search;

var information = {
    noteID: 0,
    title:'',
    tags:[],
    contentHTML:'',
    contentText:'',
}

class Editor extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            theme: 'snow'
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        information.contentHTML = this.props.initText;
    }

    handleChange(content, delta, source, editor) {
        information.contentText = editor.getText();
        information.contentHTML = content;
    }

    render () {
        return (
            <ReactQuill
                theme={this.state.theme}
                onChange={this.handleChange}
                modules={Editor.modules}
                formats={Editor.formats}
                value={information.contentHTML}
                bounds={'.app'}
                placeholder="请输入内容"
            />
        )
    }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

class Header extends React.Component {
    state = {
        loading: false,
        visible: false,
        popoverVisible: false,
        inputValue:'',
        inputVisible: false,
        colors:["red","magenta","green","blue","geekblue"],
    }

    handleClose = (removedTag) => {
        const tags = information.tags.filter(tag => tag !== removedTag);
        information.tags = tags;
        console.log(tags);
        this.setState({ });
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        var inputValue = this.state.inputValue;
        var tags = information.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            inputValue: '',
            inputVisible: false,
        });
        information.tags = tags;
    }

    showInput = () =>{
        this.setState({
            inputVisible: true
        });
    }

    renderKeyTags(){
        var tags = information.tags;
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
        var length = information.tags.length;
        var keywords ='';
        for(var i=0;i<length;++i){
            keywords += information.tags[i] + ';';
        }
        let jsonbody = {};
        jsonbody.noteID = information.noteID;
        jsonbody.noteTitle = information.title;
        jsonbody.noteContent = information.contentHTML;
        jsonbody.keywords = keywords;

        var url = IPaddress + 'service/save/note';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('('+responseJson+')');
                if(data.result == "fail"){
                    message.error("保存失败，请重试", 3)
                    return;
                }
                window.location.href="/viewnote?noteID="+information.noteID;
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    confirmLeave = () =>{
        window.location.href="/user/usernote";
    }
    cancelLeave(){
    }
    render(){
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }
        const tags = this.renderKeyTags();
        return (
            <div className="menuHeader">
                <Menu
                    mode="horizontal"
                >
                    <Menu.Item key="index">
                        <Popconfirm placement="bottomLeft" title="跳回我的笔记可能会丢失您现在的编辑，您确定要跳转吗？" onConfirm={this.confirmLeave} onCancel={this.cancelLeave} okText="Yes" cancelText="No">
                            <span>我的笔记</span>
                        </Popconfirm>
                    </Menu.Item>
                    <Popover
                        content={tags}
                        title="给你的文章添加关键词"
                        trigger="click"
                        visible={this.state.popoverVisible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Button type="primary" style={{ float:"right", right:"100px", top:"8px"}}>发布</Button>
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
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        information.noteID = window.location.search.substring(8);//noteID=
        let username = sessionStorage.getItem('username');
        let that  = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = information.noteID;
        var url = IPaddress + 'service/modify/noteDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        console.log('reach here');
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('('+responseJson+')');
                information.title = data.title;
                information.contentHTML = data.content;
                information.tags = data.keywords.split(";");
                information.tags.pop();
                console.log(information.tags);
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    handleInputChange = (e) => {
        information.title = e.target.value;
        this.setState({})
    }
    render(){
        //const side = this.renderSideCard();
        return(
            <div>
                <Header />
                <div className="textEditor" style={{width:"60%", marginLeft:"20%", marginTop:"70px"}}>
                    <input
                        style={{fontSize:"35px",fontWeight:"bolder",border:"none",outline:"none", textAlign:"center"}}
                        placeholder="请输入标题"
                        value={information.title}
                        onChange={this.handleInputChange}
                    />
                    <div className="editor" style={{marginTop:"30px"}}>
                        <Editor initText={<p>{information.contentHTML}</p>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModifyNote;