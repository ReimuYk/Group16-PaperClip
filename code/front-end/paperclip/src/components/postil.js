import React, { Component } from 'react';
import { Collapse ,Card,Input,Modal,Button,Avatar,Icon,Divider, message} from 'antd';
import Comment from "./comment";
import emitter from '.././util/events';
import { IPaddress } from '../App';
import {Link} from 'react-router-dom';

const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;
const { Meta } = Card;
const { TextArea } = Input;


class Postil extends Component{  
    constructor(props){
        super(props);

        this.setPostilIdx = this.setPostilIdx.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
        this.mark = this.mark.bind(this);
        this.handleCommentCancel = this.handleCommentCancel.bind(this);
        this.handleCommentOk = this.handleCommentOk.bind(this);
        this.showCommentModal = this.showCommentModal.bind(this);

        this.state = {
            username:sessionStorage.getItem('username'),
            data:[],
            postilIdx:null,
            inputValue:"",
            selectid:null,
            markid:null,
            commentModalVisible:false
        }
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        this.postilEvent = emitter.addListener('changePostils', (data) => {
            this.setState({
                data:data
            })
        });
        this.blockEvent = emitter.addListener('getBlockList', (data) =>{
            console.log(data);
            if(data == "empty"){
                this.setState({
                    selectid:null,
                    data:[]
                })
            }
            else
            this.setState({
                selectid:data
            })
            console.log("selectid1:"+data);
        });
    }
    componentWillUnmount() {
        //emitter.removeListener(this.postilEvent);
    }
    refreshStat(pos,flag){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.posID = pos.postils.posID;
        jsonbody.marked = pos.marked;
        jsonbody.agreement = pos.agreement;
        jsonbody.flag = flag;
        var url = IPaddress+'service/statPostil';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            //console.log(responseJson);
            let data = eval('('+responseJson+')');
            //console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    agree(e){
        e.stopPropagation();
        if(this.state.username == null){
            message.error("请先登录", 3);
            return;
        }
        var idx = e.target.value;
        var data = this.state.data;
        var flag = [0,0]//stands number changed from agreed and disagreed
        if(data[idx].agreement.agreed){
            data[idx].postils.agree -= 1;
            flag[0] = -1;
        }else{
            data[idx].postils.agree += 1;
            flag[0] = 1;
        }
        data[idx].agreement.agreed = !data[idx].agreement.agreed;
        if(data[idx].agreement.disagreed){
            data[idx].postils.disagree -= 1;
            flag[1] = -1;
            data[idx].agreement.disagreed = false;
        }
        this.setState({
            data:data
        })
        this.refreshStat(data[idx],flag)
    }
    disagree(e){
        e.stopPropagation();
        if(this.state.username == null){
            message.error("请先登录", 3);
            return;
        }
        var idx = e.target.value;
        var data = this.state.data;
        var flag = [0,0]
        if(data[idx].agreement.disagreed){
            data[idx].postils.disagree -= 1;
            flag[1] = -1;
        }else{
            data[idx].postils.disagree += 1;
            flag[1] = 1;
        }
        data[idx].agreement.disagreed = !data[idx].agreement.disagreed;
        if(data[idx].agreement.agreed){
            data[idx].postils.agree -= 1;
            flag[0] = -1
            data[idx].agreement.agreed = false;
        }
        this.setState({
            data:data
        })
        this.refreshStat(data[idx],flag)
    }
    mark(e){
        e.stopPropagation();
        if(this.state.username == null){
            message.error("请先登录", 3);
            return;
        }
        var idx = e.target.value;
        var data = this.state.data;
        data[idx].marked = 1 - data[idx].marked
        this.setState({data:data})
        this.refreshStat(data[idx],[0,0])

        var mark={};
        mark.id=this.state.markid;
        mark.posID = data[idx].postils.posID
        mark.content=data[idx].postils.content;
        mark.visible=false;
        if(data[idx].marked == 1){            
            emitter.emit('addMark',mark);
        }else{
            emitter.emit('deleteMark',mark.posID);
        }
    }
    getBlocksOfPostil(posID){
        console.log("mouse in postil "+posID);
        let that  = this;
        let jsonbody = {};
        jsonbody.posID = posID;        
        var url = IPaddress+'service/getBlocksOfPostil';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            //console.log(responseJson);
            let data = eval(responseJson);
            this.setState({markid:data});
            emitter.emit('blocksForPostil',data);
           // console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    clearBlocks(posID){
        console.log("mouse leave "+posID);
        emitter.emit('blocksForPostil',"clear");
    }

    showCommentModal(e){
        e.stopPropagation();
        console.log("event:"+e);
        this.setState({
          commentModalVisible: true,
          postilIdx: e.target.id
        });
    }
    
    handleCommentOk = (e) => {
        e.stopPropagation();
        console.log("添加评论："+this.state.inputValue);

        var value = this.state.inputValue;
        if(this.state.username == null){
            message.error("请先登录", 3);
            this.setState({commentModalVisible:false});
            return;
        }
        if(!value){
            message.error("输入不能为空", 3);
            this.setState({commentModalVisible:false});
            return;
        }

        var name = this.state.username;
        var obj = new Object();
        obj.user = name;
        obj.avatar = this.props.avatar;
        obj.content = value;

        var data = this.state.data;
        var idx = this.state.postilIdx;

        data[idx].comments.push(obj);
        this.addPostilComment(value);

        this.setState({
            commentModalVisible: false,
            data:data,
            inputValue:""
        });
      }
    
    handleCommentCancel = (e) => {
        e.stopPropagation();
        console.log(e);
        this.setState({
          commentModalVisible: false,
        });
      }
    getPostil = (item,idx)=>{  
        const buttons = (
            <span style={{position:"absolute",width:"200px"}} >
                    <Button type={this.state.username==null || !this.state.data[idx].agreement.agreed?"default":"primary"} 
                    icon="like" value={idx} 
                    onClick={this.agree}
                    size="small"
                    style={{left:"50px"}}
                    >{this.state.data[idx].postils.agree}</Button>
                    <Button type={this.state.username==null || !this.state.data[idx].agreement.disagreed?"default":"primary"} 
                    icon="dislike-o" value={idx} 
                    onClick={this.disagree}
                    size="small"
                    style={{left:"50px"}}></Button>
                <Button type={this.state.username==null || !this.state.data[idx].marked?"default":"primary"} 
                shape="circle" icon="flag" value={idx} onClick={this.mark} 
                style={{left:"80px"}}/>
            </span>);

        const commentModal =(
            <span>
                <Button id={idx} onClick={this.showCommentModal} size="small"><Icon type="plus" />添加评论</Button>
                <Modal
                title="添加评论"
                visible={this.state.commentModalVisible}
                onOk={this.handleCommentOk}
                onCancel={this.handleCommentCancel}
                >
                <TextArea rows={4} placeholder="Enter text here..." value={this.state.inputValue} onChange={this.changeInputValue}
                />
                </Modal> 
            </span>
        )
        
        return(
            <div style={{textAlign:"left"}} 
            onMouseEnter = {()=>this.getBlocksOfPostil(item.postils.posID)} 
            onMouseLeave = {()=>this.clearBlocks(item.postils.posID)}
            >
                <Card
                    style={{position:"relative"}}
                    bordered={false}
                    cover={<p style={{marginLeft:"1%"}}>
                    <Avatar src={item.postils.avatar}/>
                    <Link to={"/viewpage?username="+item.postils.user}
                    style={{color:"black",marginLeft:"1px"}}>{item.postils.user}</Link>
                    {buttons}
                    </p>}
                >
                    <Meta 
                    description={<span style={{color:"black"}}>{item.postils.content}</span>}
                    />
                </Card> 
                {commentModal}
                <span id={idx} onClick={this.setPostilIdx} 
                style={{position:"relative",left:"90px",fontSize:"14px",color:"gray"}}>
                {this.state.postilIdx==idx
                    ?"收起评论"
                    :"展开评论"}</span>
            </div>
        );
    }
    setPostilIdx(e){
        var key = e.target.id;
        var idx = this.state.postilIdx;
        console.log("key:"+key+" idx:"+idx);
        if(idx == key){
            this.setState({
                postilIdx:null
            });
        }
        else{
            this.setState({
                postilIdx:key
            })
        }
    }
    changeInputValue(e){
        this.setState({inputValue:e.target.value});
    }
    addPostilComment(content){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.posID = this.state.data[this.state.postilIdx].postils.posID;
        jsonbody.content = content;
        var url = IPaddress+'service/addPostilComment';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            //console.log(responseJson);
            let data = eval('('+responseJson+')');
            //console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    addPostil(content,newPos){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.blockList = this.state.selectid;
        jsonbody.content = content;
        var url = IPaddress+'service/addPostil';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            //console.log(responseJson);
            let data = eval('('+responseJson+')');
            var old = that.state.data;
            newPos.postils.posID = data.posID;
            old.push(newPos);
            that.setState({data:old});
            //console.log(data)
            var mark={};
            mark.id=this.state.selectid;
            mark.posID = data.posID;
            mark.content=content;
            mark.visible=false;
            emitter.emit('addMark',mark);
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleInput(value){
        if(this.state.username == null){
            message.error("请先登录", 3);
            return;
        }
        if(!value){
            message.error("输入不能为空", 3);
            return;
        }
        var idx = this.state.postilIdx;
        if(this.state.selectid == null){
            message.error("还未选中内容", 3);
            return;
        }
        var name = this.state.username;
        var obj = new Object();
        obj.user = name;
        obj.avatar = this.props.avatar;
        obj.content = value;

        var data = this.state.data;
        
        if(idx){           //添加评论
            data[idx].comments.push(obj);
            this.addPostilComment(value);
        }
        else{               //添加批注
            obj.agree = 0;
            obj.disagree = 0;
            var newPos = {
                postils:obj,
                comments:[],
                marked:1,
                agreement:{agreed:false,disagreed:false}
                };            
            this.addPostil(value,newPos);         
        }
        this.setState({
            data:data,
            inputValue:""
        });
    }
    
    handleReply(name){
        this.setState({
            inputValue:"@"+name+":",
            commentModalVisible:true
        });
    }
    
    render() {
        const data = this.state.data;
        //console.log('postil.js data: ', data);
        return(
            <div id="postil" 
            style={{width:"23%",height:"90%",overflowY:"scroll",overflowX:"hidden",
             position:"fixed",right:"0px",marginLeft:"5px",padding:"0,5px"}}>                
                <Collapse accordion bordered={false} 
                activeKey={this.state.postilIdx}>
                {
                    data.map((item,idx)=>{
                        var postil = this.getPostil(item,idx);
                        return(
                            <Panel header={postil} key={idx} >
                                    <Comment data={data[idx].comments} handleReply={this.handleReply.bind(this)}/>
                            </Panel>
                        );
                    },this)
                }
                </Collapse>                             
          </div>          
        );
    }
}

export default Postil;