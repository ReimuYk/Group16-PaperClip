import React, { Component } from 'react';
import {Popconfirm, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar, Menu, Modal} from 'antd';
import { IPaddress } from '../App'
import  { Redirect, Link } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Search = Input.Search;

var information = {
    docID: 0,
    title:'',
    tags:[],
    contentHTML:'',
    contentText:'',
    contributors:[]
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
        information.content = this.props.initText;
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
                value={information.content}
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
        ['link', 'image', 'video'],
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
    'link', 'image', 'video'
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
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags:tags });
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
        alert(information.contentHTML);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOK = () => {
        this.setState({
            visible: false
        });
    }

    handleCancel = () =>{
        this.setState({
            visible: false
        });
    }

    addContributor(){
        console.log()
        alert("邀请成功！");
    }

    saveDoc = () => {
        alert("保存成功！");
    }
    renderModal() {
        const visible = this.state.visible;
        return (
            <div>
                <Modal
                    visible={visible}
                    title="协作者"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleOK}>完成</Button>,
                    ]}
                >
                    <Search
                        placeholder="请输入用户名"
                        onSearch={this.addContributor}
                        style={{ width: "100%" }}
                        enterButton={<Icon type="plus-circle-o" />}
                    />
                    <div className="invitorList" style={{marginTop: "15px"}}>
                        <p>目前的协作者有：</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={information.contributors}
                            renderItem={item => (
                                <List.Item actions={[<a>删除</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<Link to={"/viewpage?username=" + item.username}>{item.username}</Link>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </Modal>
            </div>
        )
    }

    confirmLeave(){
        alert('跳转到首页');
    }
    cancelLeave(){
    }
    render(){
        if(sessionStorage.getItem('username') == ''){
            return <Redirect to="/login"/>;
        }
        const renderModal = this.renderModal();
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
                    <Menu.Item key="invite" onClick={this.showModal}>
                        <Icon type="user-add" />协作者
                    </Menu.Item>
                    <Button type="primary" style={{float:"right", right:"80px", top:"8px"}} onClick={this.saveDoc}>保存</Button>
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
                {renderModal}
            </div>
        );
    }
}
class ModifyDoc extends Component{
    state = {
        title:'',
        initContent:''
    }
    componentWillMount = () => {
        var urlDocID = window.location.search.substring(7);
        let username = sessionStorage.getItem('username');
        let that  = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.docID = urlDocID;
        var url = IPaddress + 'service/modify/docDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                console.log(responseJson);
                let data = eval('('+responseJson+')');
                information.title = data.title;
                information.contentHTML = data.content;
                information.contributors = data.contributer;
                that.setState({
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    handleInputChange = (e) => {
        information.title = e.target.value;
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
                        <Editor initText={<p>{this.state.initContent}</p>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModifyDoc;