import React, { Component } from 'react';
import Editor from '.././components/textEditor';
import {Popconfirm, Popover,Icon,Button,Tag, Input, Tooltip,List,Avatar, Menu, Modal} from 'antd';

const Search = Input.Search;
const data = [
    {
        username:'大哥'
    },
    {
        username:'大嫂'
    }
];

class Header extends React.Component {
    state = {
        loading: false,
        visible: false,
        popoverVisible: false,
        tags:["key1"],
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

    addInvitor(){
        alert("邀请成功！");
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
                        onSearch={this.addInvitor}
                        style={{ width: "100%" }}
                        enterButton={<Icon type="plus-circle-o" />}
                    />
                    <div className="invitorList" style={{marginTop: "15px"}}>
                        <p>目前的协作者有：</p>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item actions={[<a>删除</a>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={<a href="https://ant.design">{item.username}</a>}
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
                    <Popover
                        content={tags}
                        title="给你的文章添加关键词"
                        trigger="click"
                        visible={this.state.popoverVisible}
                        onVisibleChange={this.handleVisibleChange}
                    >
                        <Button type="primary" style={{float:"right", right:"100px", top:"8px"}}>发布</Button>
                    </Popover>
                </Menu>
                {renderModal}
            </div>
        );
    }
}
class WriteDoc extends Component{
    /*constructor(props){
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
        //this.addInvitor = this.addInvitor.bind(this);
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
    /*addInvitor(name){
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
    }*/
    render(){
        //const side = this.renderSideCard();
        return(
            <div>
                <Header />
                <div className="textEditor" style={{width:"60%", marginLeft:"20%", marginTop:"70px"}}>
                    <input
                        style={{fontSize:"35px",fontWeight:"bolder",border:"none",outline:"none", textAlign:"center"}}
                        placeholder="请输入标题"
                    />
                    <div className="editor" style={{marginTop:"30px"}}>
                        <Editor initText="<p>请输入内容</p>"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default WriteDoc;