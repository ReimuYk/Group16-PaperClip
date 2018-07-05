import React, { Component } from 'react';
import { Divider, Input, Modal, Icon, Button } from 'antd';
import '../css/style.css'
import constuh from '../statics/uh.jpg'
import NavBar from '../components/nav-bar';
const constUserID = 0;
const constUserDescription = '用户描述';
const constUserName = '用户名';
const constDocTitle = '文档标题';
const constDocContent = '一次坐葡萄牙TAP航空从里斯本飞卡萨布兰卡，是那种螺旋桨小飞机，我选到了第一排紧急出口旁边的座位，登机之后正对面就坐着一个空少小哥。在候机厅的时候口渴在自动售货机里吗买了一小听类似芬达的碳酸饮料，后来广播登机了没来得及打开就放到了冲锋衣的兜里登机了。后来飞机升空平稳解开安全带之后我想起来了还有一听饮料准备喝，正好这时候空少小哥在后面，我当时脑子不知道怎么想的鬼使神差的把那听饮料藏在了我那件比较宽大的冲锋衣的袖子里面。小哥回来坐下了之后，我慢慢把袖子竖起来，另一只手伸进去扣住拉环，“呲”的一声拉开了拉环，同时还冒出来一股白烟，之后举起来喝了一口。短短的五秒之内，我观察空少小哥的面部表情至少经历了“疑惑—诧异/恐惧/绝望—劫后余生的喜悦与放松”三种状态。后来一想，要是对面坐的不是空少是空警，我应该已经被当场击毙了吧……'

const { TextArea } = Input;
class ViewNote extends Component{
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
    renderTopNav = () =>{
        return(
        <div className="navbartop">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#">Action</a>
                                <a class="dropdown-item" href="#">Another action</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                        </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
        )
    }

    render(){
        const topNav = this.renderTopNav();
        return(
            <div>
                <NavBar />
            <div className="content" style={{width:"690px", margin:"auto"}}>
                {topNav}
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
            </div>
        )
    }
}


export default ViewNote;