import React, { Component } from 'react';
import { Divider, Input, Modal, Icon } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar';
import '../css/style.css'
import constuh from '../statics/uh.jpg'
const constUserID = 0;
const constUserDescription = '用户描述';
const constUserName = '用户名';
const constDocTitle = '文档标题';
const constDocContent = '一次坐葡萄牙TAP航空从里斯本飞卡萨布兰卡，是那种螺旋桨小飞机，我选到了第一排紧急出口旁边的座位，登机之后正对面就坐着一个空少小哥。在候机厅的时候口渴在自动售货机里吗买了一小听类似芬达的碳酸饮料，后来广播登机了没来得及打开就放到了冲锋衣的兜里登机了。后来飞机升空平稳解开安全带之后我想起来了还有一听饮料准备喝，正好这时候空少小哥在后面，我当时脑子不知道怎么想的鬼使神差的把那听饮料藏在了我那件比较宽大的冲锋衣的袖子里面。小哥回来坐下了之后，我慢慢把袖子竖起来，另一只手伸进去扣住拉环，“呲”的一声拉开了拉环，同时还冒出来一股白烟，之后举起来喝了一口。短短的五秒之内，我观察空少小哥的面部表情至少经历了“疑惑—诧异/恐惧/绝望—劫后余生的喜悦与放松”三种状态。后来一想，要是对面坐的不是空少是空警，我应该已经被当场击毙了吧……'

const { TextArea } = Input;
class ViewDoc extends Component{
    state = {
        uh: '',
        userID: 0,
        userDescription: '',
        userName: '',
        docID: 0,
        docTitle: '',
        docContent: '',

        visible: false,
        mailContent: '',
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
        })
    }
    showModal = () => {
        this.setState({
            visible: true,
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
    handleMailChange = (event) => {
        console.log('send mail', event.target.value);
        this.setState({ mailContent: event.target.value });
        /* send to server, server => that user */
    }
    clearInput = () => {
        this.setState({ mailContent: '' });
    }
    render(){
        return(
            <div>
                <NavBar />
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
                <div>
                    <h1>{this.state.docTitle}</h1>
                    <Divider />
                    <div style={{width:'50%', textAlign:'center',marginLeft:'25%'}}>
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
                            <span>
                            <Icon  onClick={this.sendMail} type='mail' style={{ fontSize: 30, color: '#08c' }} />
                            </span>
                            <span style={{width:'80px',marginLeft:'20px'}}>
                            <Icon  onClick={this.showModal} type="plus-square-o" style={{ fontSize: 30, color: '#08c' }} />
                            </span>
                            <br />
                            <a onClick={this.showModal}>发私信</a>
                            <a style={{width:'80px',marginLeft:'20px'}} onClick={this.followUser}>关注</a>
                            </p>
                            <br />
                        </div>
                        
                    </div>
                    
                </div>
                <div style={{display:'inline-block',width:'50%',textAlign:'left'}}>
                    <p>{this.state.docContent}</p>
                </div>
            </div>
        )
    }
}


export default ViewDoc;