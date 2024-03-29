import React, { Component } from 'react';
import { Divider, Input, Modal, Icon, Button, List, message } from 'antd';
import { Link} from 'react-router-dom'
import '../css/style.css'
import NavBar from '../components/nav-bar';
import { IPaddress } from '../App';
const { TextArea } = Input;

var noteID = 0;
var username = '';

var information = {
    author:'',
    authorDescription:'',
    authorAvatar:'',
    title:'',
    content:'',
    data:'',
    paperID:0
}
class ViewNote extends Component{
    state = {
        commentVisible: false,
        visible: false,
        mailContent: '',
        commentContent:'',
        commentNo:0,
        likeNo:0,
        comment:[],
        ifLike: false,
        ifStar: false,
        ifFollow:false
    }
    componentWillMount = () => {
        /* get docID from url */
        noteID = this.props.location.search.substring(8);//7 == 'noteID='.length+1
         /* get info from server */
        let that = this;
        /* get username */
        username = sessionStorage.getItem('username');
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = noteID;
        console.log(jsonbody);
        let url = IPaddress + 'service/noteDetail';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                information.author = data.author;
                information.title = data.title;
                information.content = data.content;
                information.date = data.date;
                information.authorAvatar = data.avatar;
                information.authorDescription = data.description;
                information.paperID = data.paperID;
                that.setState({
                    ifLike: data.ifLike,
                    ifStar: data.ifStar,
                    ifFollow: data.ifFollow,
                    commentNo: data.commentNo,
                    likeNo: data.likeNo
                })
            }).catch(function(e){
            console.log("Oops, error");
        })

    }
    showModal = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        this.setState({
            visible: true,
        });
    }
    showComment = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/getNoteComment';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                that.setState({
                    comment: data,
                    commentVisible: true
                })
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleOk = (e) => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        if(this.state.mailContent == ''){
            message.error('内容不能为空！', 3);
            return;
        }
        let that  = this;
        let jsonbody = {};
        jsonbody.senderName = username;
        jsonbody.receiverName = information.author;
        jsonbody.content = that.state.mailContent;
        var url = IPaddress + 'service/sendMessage';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                if(data.result != "fail"){
                    that.setState({
                        mailContent: '',
                        visible: false
                    })
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCommentOk = () => {
        this.setState({
            commentVisible: false,
        });
    }
    handleCommentCancel = () => {
        this.setState({
            commentContent: '',
            commentVisible: false,
        });
    }
    handleMailChange = (event) => {
        this.setState({ mailContent: event.target.value });
        /* send to server, server => that user */
    }
    handleCommentChange = (event) => {
        this.setState({ commentContent: event.target.value });
    }
    clearInput = () => {
        this.setState({ mailContent: '' });
    }
    clearCommentInput = () => {
        this.setState({ commentContent: '' });
    }
    commitComment = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        if(this.state.commentContent == '')
        {
            message.error('内容不能为空！', 3);
            return;
        }
        let that = this;
        var tmp = this.state.comment;
        let jsonbody = {};
        jsonbody.noteID = noteID
        jsonbody.username = username;
        jsonbody.content = this.state.commentContent;
        let url = IPaddress + 'service/addNoteComment';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "fail"){
                    message.error('评论发布失败，请重试！', 3);
                    return;
                }
                console.log(result);
                that.setState({
                    comment: tmp,
                    commentContent: '',
                    commentNo: result.commNo
                });
                this.showComment();
            }).catch(function(e) {
            console.log("Oops, error");
        })
    }
    like = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/agreeNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    this.setState( {
                        likeNo: result.likeNo,
                        ifLike: true
                    } );
                }
                else{
                    message.error("点赞错误，请重试", 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    cancelLike = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/agreeNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    that.setState( {
                        likeNo: result.likeNo,
                        ifLike: false
                    } );
                }
                else{
                    message.error('取消失败，请重试', 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }
    star = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/starTheNote';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    that.setState({
                        ifStar: true
                    })
                }
                else{
                    message.error('收藏失败，请重试', 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
        this.setState({
            ifStar: true
        })
    }
    cancelStar = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/quitStar/note';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    that.setState({
                        ifStar: false
                    })
                }
                else{
                    message.error('取消失败，请重试', 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    followUser = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = information.author;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('('+responseJson+')');
                if(result.result == "fail"){
                    message.error('关注失败，请重试', 3);
                    return;
                }
                that.setState({
                    ifFollow: true
                })
            }).catch(function(e) {
            console.log("Oops, error");
        })
    }

    quitFollow = () => {
        if(username == null || username == ''){
            message.error('请先登录', 3);
            return;
        }
        let that = this;
        /* tell the server to do something */
        let jsonbody = {};
        jsonbody.hostname = username;
        jsonbody.clientname = information.author;
        let url = IPaddress + 'service/quitStar/user';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval('(' + responseJson + ')');
                if(result.result == "success"){
                    that.setState({
                        ifFollow: false
                    })
                }
                else{
                    message.error('取消失败，请重试', 3);
                }
            }).catch(function(e){
            console.log("Oops, error");
        })
    }

    shareLink = () => {
        var content = window.location.href;
        var oInput = document.createElement('input');
        oInput.value = content;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        document.body.removeChild (oInput);
        message.success('复制链接成功', 3);
    }

    renderLikeButton(){
        if(!this.state.ifLike)
        {
            return(
                <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.like}><Icon type="like-o" /> 点赞 ( {this.state.likeNo} ) </a>
            )
        }
        else
        {
            return(
                <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.cancelLike}><Icon type="like" /> 取消赞 ( {this.state.likeNo} ) </a>
            )
        }
    }

    renderStarButton(){
        if(!this.state.ifStar){
            return(
                <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.star}><Icon type="star-o" /> 收藏本文</a>
            )
        }
        else{
            return(
                <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.cancelStar}><Icon type="star" /> 取消收藏</a>
            )
        }
    }
    renderBottomNav = () =>{
        const likeButton = this.renderLikeButton();
        const starButton = this.renderStarButton();
        return(
            <div className="navbartop">
                <nav class="navbar navbar-fixed-bottom navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header" style={{width: "100%", paddingLeft:"25%", paddingRight:"25%", textAlign:"center"}}>
                            {likeButton}
                            {starButton}
                            <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.showComment}><Icon type="message" /> 评论 ( {this.state.commentNo} )</a>
                            <a style={{width:"20%"}} class="navbar-brand" href="#" onClick={this.shareLink}><Icon type="fork" /> 分享</a>
                            <a style={{width:"20%"}} class="navbar-brand" href={"/paper?paperID=" + information.paperID}><Icon type="link" />跳转到论文</a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    renderComment = () =>{
        return(
            <List
                pagination={{pageSize: 3}}
                itemLayout="horizontal"
                dataSource={this.state.comment}
                renderItem={item => (
                    <List.Item
                        actions={[<p>{item.date}</p>]}
                    >
                        <List.Item.Meta
                            title={<Link to={"/viewpage?username=" + item.username}>{item.username}</Link>}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        )
    }
    renderButton(){
        if(information.author != username || username == null){
            if(!this.state.ifFollow){
                return(
                    <p>
                        <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                        <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary" onClick={this.followUser}><Icon type='plus-square-o' />关注</Button>
                    </p>
                )
            }
            return (
                <p>
                    <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                    <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary" onClick={this.quitFollow}>取消关注</Button>
                </p>
            )
        }
        else{
            return(
                <Link to={"/user/modifyNote?noteID=" + noteID}>
                    <Button style={{width:"100px"}} size="large" type="primary">修改笔记</Button>
                </Link>
            )
        }
    }
    renderContent(){
        return(
            <div dangerouslySetInnerHTML={{ __html: information.content}}></div>
        )
    }

    render(){
        const bottomNav = this.renderBottomNav();
        const comment = this.renderComment();
        const button = this.renderButton();
        const content = this.renderContent();
        return(
            <div>
                <NavBar/>
                <div className="content" style={{width:"50%", margin:"auto"}}>
                    <Modal
                        style={{height:'500px'}}
                        width={500}
                        title='私信'
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        afterClose={this.clearInput}
                    >
                        <TextArea rows={5} value={this.state.mailContent} onChange={this.handleMailChange} placeholder='私信内容' />
                    </Modal>
                    <Modal
                        width={700}
                        title='评论'
                        visible={this.state.commentVisible}
                        onOk={this.commitComment}
                        onCancel={this.handleCommentCancel}
                        afterClose={this.clearCommentInput}
                        footer={[
                            <Button key="back" onClick={this.handleCommentCancel}>关闭</Button>,
                            <Button type="primary" onClick={this.commitComment}>发送</Button>
                        ]}
                    >
                        {comment}
                        <TextArea rows={2} value={this.state.commentContent} onChange={this.handleCommentChange} placeholder='添加评论' />
                    </Modal>
                    <div>
                        <h1 class="Post-Title" style={{ fontWeight: "600", fontSize: "36px", textAlign:"left"}}> {information.title} </h1>
                        <Divider />
                        <div style={{textAlign:'left'}}>
                            <div id='u1-1'>
                            <Link to={'/viewpage?username='+information.author}>
                                <img alt='' src={information.authorAvatar}
                                     style={{width:'80px',height:'80px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                                />
                            </Link>
                            </div>

                            <div id='u1-2'>
                                <br />
                                <Link to={'/viewpage?username='+information.author}>
                                <h3>{ information.author }</h3>
                                <p>{ information.authorDescription }</p>
                                </Link>
                                <br />
                                <br />
                            </div>
                            <div id='u1-3'>
                                <br />
                                {button}
                                <br />
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{display:'inline-block', textAlign:'left', width:"50%", margin: "auto"}}>
                    <p style={{fontSize:"18px"}}>{content}</p>
                </div>
                {bottomNav}
            </div>
        )
    }
}


export default ViewNote;