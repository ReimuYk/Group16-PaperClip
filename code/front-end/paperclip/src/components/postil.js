import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor, message} from 'antd';
import Comment from "./comment";
import emitter from '.././util/events';
import { IPaddress } from '../App';
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
            selectid:null
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
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    agree(e){
        e.stopPropagation();
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
        var idx = e.target.value;
        var data = this.state.data;
        data[idx].marked = 1 - data[idx].marked
        this.setState({data:data})
        this.refreshStat(data[idx],[0,0])
    }
    getPostil = (item,idx)=>{
        return(
            <div style={{textAlign:"left"}}>
                <p style={{marginLeft:"1%"}}>
                    <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    {item.postils.user}
                </p>
                <p style={{marginTop:"7%"}}>{item.postils.content}</p>  
                <Divider />  
                <ButtonGroup>
                    <Button type={this.state.data[idx].agreement.agreed?"primary":"default"} icon="like" value={idx} onClick={this.agree}>{this.state.data[idx].postils.agree}</Button>
                    <Button type={this.state.data[idx].agreement.disagreed?"primary":"default"} icon="dislike-o" value={idx} onClick={this.disagree}>{this.state.data[idx].postils.disagree}</Button>
                </ButtonGroup>
                <Divider type="vertical"/>
                <Button type={this.state.data[idx].marked?"primary":"default"} shape="circle" icon="flag" value={idx} onClick={this.mark}/>
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
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            console.log(data)
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
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            var old = that.state.data;
            newPos.postils.posID = data.posID;
            old.push(newPos);
            that.setState({data:old});
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    handleInput(value){
        if(!value){
            message.error("输入不能为空");
            return;
        }
        var idx = this.state.postilIdx;
        if(!idx){
            message.error("未选中内容");
            return;
        }
        var name = this.state.username;
        var obj = new Object();
        obj.user = name;
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
        return(
            <div id="postil" 
            style={{width:"20%",height:"530px",overflowY:"scroll",
             position:"fixed",right:"0px",marginLeft:"5px"}}>
                <Anchor offsetTop={60} style={{position:"fixed",zIndex:"1",backgroundColor:"#FFFFFF"}}>
                    <Search
                    type="textarea"
                    placeholder="input text"
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
                    data.map((postil,idx)=>{
                        var postil = this.getPostil(postil,idx);
                        return(
                            <Panel header={postil} key={idx}>
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