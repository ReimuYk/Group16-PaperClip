import React, { Component } from 'react';
import { Divider, Input, Modal, Icon, Button, List } from 'antd';
import '../css/style.css'
import NavBar from '../components/nav-bar';
import { IPaddress } from '../App'
const { TextArea } = Input;

var noteID = 0;
var username = '';

var information = {
    author:'',
    authorDescription:'',
    authorAvatar:'',
    title:'',
    content:'',
    data:''
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
        jsonbody.noteID = noteID;
        let url = IPaddress + 'service/viewNote';
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
                information.data = data.date;
            }).catch(function(e){
            console.log("Oops, error");
        })

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    showComment = () => {
        this.setState({
            commentVisible: true,
        });
    }
    handleOk = (e) => {
        console.log('write mail');
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
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
            commentVisible: false,
        });
    }
    handleMailChange = (event) => {
        console.log('send mail', event.target.value);
        this.setState({ mailContent: event.target.value });
        /* send to server, server => that user */
    }
    handleCommentChange = (event) => {
        this.setState({ commentContent: event.target.value });
        /* send to server, server => that user */
    }
    clearInput = () => {
        this.setState({ mailContent: '' });
    }
    clearCommentInput = () => {
        this.setState({ commentContent: '' });
    }
    commitComment = () => {
        if(this.state.commentContent == '')
        {
            alert('内容不能为空！')
            return;
        }
        var tmp = this.state.comment;
        var number = this.state.commentNo;
        tmp.push({user:this.state.username, comment: this.state.commentContent});
        this.setState({
            comment: tmp,
            commentContent: '',
            commentNo: number+1
        });
    }
    like = () => {
        var like = this.state.likeNo;
        this.setState( {
            likeNo: like + 1,
            ifLike: true
        } )
    }
    cancelLike = () => {
        var like = this.state.likeNo;
        this.setState( {
            likeNo: like - 1,
            ifLike: false
        })
    }
    star = () => {
        this.setState({
            ifStar: true
        })
    }
    cancelStar = () => {
        this.setState({
            ifStar: false
        })
    }

    followUser = () => {
        /* get data according to username */
        let jsonbody = {};
        jsonbody.hostname = this.state.username;
        jsonbody.clientname = this.state.author;
        let url = IPaddress + 'service/follow';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let result = eval(responseJson);
                if(result == "fail"){
                    alert("关注失败，请重试");
                }
            }).catch(function(e) {
            console.log("Oops, error");
        })
    }
    renderLikeButton(){
        if(!this.state.ifLike)
        {
            return(
                <a style={{width:"25%"}} class="navbar-brand" href="#" onClick={this.like}><Icon type="like-o" /> 点赞 ( {this.state.likeNo} ) </a>
            )
        }
        else
        {
            return(
                <a style={{width:"25%"}} class="navbar-brand" href="#" onClick={this.cancelLike}><Icon type="like" /> 取消赞 ( {this.state.likeNo} ) </a>
            )
        }
    }

    renderStarButton(){
        if(!this.state.ifStar){
            return(
                <a style={{width:"25%"}} class="navbar-brand" href="#" onClick={this.star}><Icon type="star-o" /> 收藏本文</a>
            )
        }
        else{
            return(
                <a style={{width:"25%"}} class="navbar-brand" href="#" onClick={this.cancelStar}><Icon type="star" /> 取消收藏</a>
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
                            <a style={{width:"25%"}} class="navbar-brand" href="#" onClick={this.showComment}><Icon type="message" /> 评论 ( {this.state.commentNo} )</a>
                            <a style={{width:"25%"}} class="navbar-brand" href="#"><Icon type="fork" /> 分享</a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
    renderComment = () =>{
        return(
            <List
                itemLayout="horizontal"
                dataSource={this.state.comment}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a>{item.user}</a>}
                            description={item.comment}
                        />
                    </List.Item>
                )}
            />
        )
    }
    renderButton(){
        if(information.author != username){
            return (
                <p>
                    <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                    <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary" onClick={this.followUser}><Icon type='plus-square-o' />关注</Button>
                </p>
            )
        }
        else{
            return(
                <Link to={"/modifyNote?noteID=" + noteID}>
                    <Button style={{width:"100px"}} size="large" type="primary">修改笔记</Button>
                </Link>
            )
        }
    }
    render(){
        const bottomNav = this.renderBottomNav();
        const comment = this.renderComment();
        const button = this.renderButton();
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
                        onOk={this.handleCommentOk}
                        onCancel={this.handleCommentCancel}
                        afterClose={this.clearCommentInput}
                    >
                        {comment}
                        <TextArea rows={2} value={this.state.commentContent} onChange={this.handleCommentChange} placeholder='添加评论' />
                        <Button type="primary" onClick={this.commitComment}>添加评论</Button>
                    </Modal>
                    <div>
                        <h1 class="Post-Title" style={{ fontWeight: "600", fontSize: "36px", textAlign:"left"}}> {information.title} </h1>
                        <Divider />
                        <div style={{textAlign:'left'}}>
                            <div id='u1-1'>
                                <img alt='' src={information.authorAvatar}
                                     style={{width:'80px',height:'80px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                                />
                            </div>

                            <div id='u1-2'>
                                <br />
                                <h3>{ information.author }</h3>
                                <p>{ information.authorDescription }</p>
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
                    <div style={{display:'inline-block', textAlign:'left'}}>
                        <p style={{fontSize:"18px"}}>{information.content}</p>
                    </div>
                </div>
                {bottomNav}
            </div>
        )
    }
}


export default ViewNote;