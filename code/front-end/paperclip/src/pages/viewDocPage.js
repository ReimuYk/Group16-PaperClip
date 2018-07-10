import React, { Component } from 'react';
import { Divider, Input, Modal, Icon, Button, List } from 'antd';
import '../css/style.css'
import NavBar from '../components/nav-bar';
import UserFloatMenu from '../components/userFloatMenu';

import constuh from '../statics/uh.jpg'
const constUserID = 0;
const constUserDescription = '用户描述';
const constUserName = '用户名';
const constDocTitle = '文档标题';
const constDocContent = '一次坐葡萄牙TAP航空从里斯本飞卡萨布兰卡，是那种螺旋桨小飞机，我选到了第一排紧急出口旁边的座位，登机之后正对面就坐着一个空少小哥。在候机厅的时候口渴在自动售货机里吗买了一小听类似芬达的碳酸饮料，后来广播登机了没来得及打开就放到了冲锋衣的兜里登机了。后来飞机升空平稳解开安全带之后我想起来了还有一听饮料准备喝，正好这时候空少小哥在后面，我当时脑子不知道怎么想的鬼使神差的把那听饮料藏在了我那件比较宽大的冲锋衣的袖子里面。小哥回来坐下了之后，我慢慢把袖子竖起来，另一只手伸进去扣住拉环，“呲”的一声拉开了拉环，同时还冒出来一股白烟，之后举起来喝了一口。短短的五秒之内，我观察空少小哥的面部表情至少经历了“疑惑—诧异/恐惧/绝望—劫后余生的喜悦与放松”三种状态。后来一想，要是对面坐的不是空少是空警，我应该已经被当场击毙了吧……';
const constLikeNo = 10;
const constCommentNo = 2;
const constComment = [{user:'大哥', comment:'....'},{user:'大嫂', comment:'.....'}];
const { TextArea } = Input;
const constIfLike = false;
const constIfStar = false;
const constUsername = '我自己';
class ViewDoc extends Component{
    state = {
        uh: '',
        userID: 0,
        userDescription: '',
        userName: '',
        docID: 0,
        docTitle: '',
        docContent: '',
        commentVisible: false,
        visible: false,
        mailContent: '',
        commentContent:'',
        commentNo:0,
        likeNo:0,
        comment:[],
        ifLike: false,
        ifStar: false,
        username:''
    }
    componentWillMount = () => {
        /* get docID from url */
        var urlDocID = this.props.location.search.substring(7);//7 == 'docID='.length+1
         /* get info from server */
         this.setState({
            uh: constuh,
            userID: constUserID,
            userDescription: constUserDescription,
            userName: constUserName,
            docID: urlDocID,
            docTitle: constDocTitle,
            docContent: constDocContent,
             comment:constComment,
             commentNo:constCommentNo,
             likeNo:constLikeNo,
             ifLike: constIfLike,
             ifStar: constIfStar,
             username: constUsername
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
    render(){
        const bottomNav = this.renderBottomNav();
        const comment = this.renderComment();
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
                        <h1 class="Post-Title" style={{ fontWeight: "600", fontSize: "36px", textAlign:"left"}}> {this.state.docTitle} </h1>
                        <Divider />
                        <div style={{textAlign:'left'}}>
                            <div id='u1-1'>
                                <img alt='' src={this.state.uh}
                                     style={{width:'80px',height:'80px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                                />
                            </div>

                            <div id='u1-2'>
                                <br />
                                <h3>{ this.state.userName }</h3>
                                <p>{ this.state.userDescription }</p>
                                <br />
                                <br />
                            </div>
                            <div id='u1-3'>
                                <br />
                                <p>
                                    <Button style={{width:"100px"}} size="large" type="primary" onClick={this.showModal}><Icon type='mail' />发私信</Button>
                                    <Button style={{width:"100px", marginLeft:"10px"}} size="large" type="primary" onClick={this.followUser}><Icon type='plus-square-o' />关注</Button>
                                </p>
                                <br />
                            </div>

                        </div>

                    </div>
                    <div style={{display:'inline-block', textAlign:'left'}}>
                        <p style={{fontSize:"18px"}}>{this.state.docContent}</p>
                    </div>
                </div>
                {bottomNav}
            </div>
        )
    }
}


export default ViewDoc;