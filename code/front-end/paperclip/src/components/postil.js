import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor, message} from 'antd';
import Comment from "./comment";
import emitter from '.././util/events';
import { IPaddress } from '../App';
import {Link} from 'react-router-dom';

const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;


class Postil extends Component{  
    constructor(props){
        super(props);

        this.setPostilIdx = this.setPostilIdx.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.agree = this.agree.bind(this);
        this.disagree = this.disagree.bind(this);
        this.mark = this.mark.bind(this);

        this.state = {
            username:sessionStorage.getItem('username'),
            data:[],
            postilIdx:null,
            inputValue:"",
            selectid:null,
            markid:null,
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
    getPostil = (item,idx)=>{
        console.log('postil line 139, this.state.data: ', this.state.data);
        console.log('idx', idx);
        console.log('item', item);
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
    getPostil = (item,idx)=>{        
        return(
            <div style={{textAlign:"left"}} 
            onMouseEnter = {()=>this.getBlocksOfPostil(item.postils.posID)} 
            onMouseLeave = {()=>this.clearBlocks(item.postils.posID)}>
                <p style={{marginLeft:"1%"}}>
                    <Avatar shape="square" src={item.postils.avatar}/>
                    <Link to={"/viewpage?username="+item.postils.user}>{item.postils.user}</Link>
                </p>
                <p style={{marginTop:"7%"}}>{item.postils.content}</p>  
                <Divider />  
                <ButtonGroup>
                    <Button type={this.state.username==null || !this.state.data[idx].agreement.agreed?"default":"primary"} 
                    icon="like" value={idx} 
                    onClick={this.agree}>{this.state.data[idx].postils.agree}</Button>
                    <Button type={this.state.username==null || !this.state.data[idx].agreement.disagreed?"default":"primary"} 
                    icon="dislike-o" value={idx} 
                    onClick={this.disagree}>{this.state.data[idx].postils.disagree}</Button>
                </ButtonGroup>
                <Divider type="vertical"/>
                <Button type={this.state.username==null || !this.state.data[idx].marked?"default":"primary"} shape="circle" icon="flag" value={idx} onClick={this.mark}/>
            </div>
        );
    }
    setPostilIdx(key){
        if(!key){
            key = null;
        }
        console.log(key);
        this.setState({
            postilIdx:key
        })
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
        //console.log("father:"+name);
        this.setState({
            inputValue:"@"+name+":",
        });
    }
    
    render() {
        const data = this.state.data;
        console.log('postil.js data: ', data);
        return(
            <div id="postil" 
            style={{width:"20%",height:"90%",overflowY:"scroll",
             position:"fixed",right:"0px",marginLeft:"5px"}}>
                <Anchor offsetTop={"15%"} style={{position:"fixed",zIndex:"1",backgroundColor:"#FFFFFF"}}>
                    <Search
                    type="textarea"
                    placeholder="请输入批注内容"
                    enterButton={<Icon type="enter" />}
                    size="default"
                    value={this.state.inputValue}
                    onChange={this.changeInputValue}
                    onSearch={this.handleInput}
                    />   
                </Anchor>
                <Collapse accordion bordered={false} onChange={this.setPostilIdx}
                 style={{marginTop:"14%"}}>
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