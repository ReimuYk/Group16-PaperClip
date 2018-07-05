import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor} from 'antd';
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
            username:"fakeName",
            postils:[
                {user:"baibai",content:"我觉得OK",agree:10,disagree:2},
                {user:"haliai",content:"我觉得不行",agree:2,disagree:1}
            ],
            comments:[
                [{user:"b",content:"1"},
                {user:"ai",content:"2"}],
                [{user:"1",content:"asdd"},
                {user:"a445i",content:"倍v"}]
            ],
            markList:[],
            agreeList:[],
            postilIdx:null,
            inputValue:"",
            agreeOK:true,
            disagreeOK:true
        }
    }
    componentWillMount(){
        var postil = this.state.postils;
        var markList = [];
        var agreeList = [];
        for (var i=0;i<postil.length;i+=1){
            markList.push(0);
            agreeList.push({agreed:false,disagreed:false});
        }
        this.setState({
            markList:markList,
            agreeList:agreeList
        });
    }
    agree(e){
        e.stopPropagation();
        var idx = e.target.value;
        var postils = this.state.postils;
        var agreeList = this.state.agreeList;

        if(agreeList[idx].agreed){
            postils[idx].agree -= 1;
        }else{
            postils[idx].agree += 1;
        }
        agreeList[idx].agreed = !agreeList[idx].agreed;
        if(agreeList[idx].disagreed){
            postils[idx].disagree -= 1;
            agreeList[idx].disagreed= false;
        } 
        this.setState({
            postils:postils,
            agreeList:agreeList
        });
    }
    disagree(e){
        e.stopPropagation();
        var idx = e.target.value;
        var postils = this.state.postils;
        var agreeList = this.state.agreeList;

        if(agreeList[idx].disagreed){
            postils[idx].disagree -= 1;
        }else{
            postils[idx].disagree += 1;
        }
        agreeList[idx].disagreed = !agreeList[idx].disagreed;
        if(agreeList[idx].agreed){
            postils[idx].agree -= 1;
            agreeList[idx].agreed= false;
        }        
        this.setState({
            postils:postils,
            agreeList:agreeList
        });
    }
    mark(e){
        e.stopPropagation();
        var idx = e.target.value;
        var markList = this.state.markList;
        markList[idx] = 1 - markList[idx];
        this.setState({markList:markList});
    }
    getPostil = (item,idx)=>{
        console.log(this.state.agreeList);
        return(
            <div style={{textAlign:"left"}}>
                <p style={{marginLeft:"1%"}}>
                    <Avatar shape="square" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    {item.user}
                </p>
                <Divider />
                <p>{item.content}</p>  
                <Divider />  
                <ButtonGroup>
                    <Button type={this.state.agreeList[idx].agreed?"primary":"default"} icon="like" value={idx} onClick={this.agree}>{item.agree}</Button>
                    <Button type={this.state.agreeList[idx].disagreed?"primary":"default"} icon="dislike-o" value={idx} onClick={this.disagree}>{item.disagree}</Button>
                </ButtonGroup>
                <Divider type="vertical"/>
                <Button type={this.state.markList[idx]?"primary":"default"} shape="circle" icon="flag" value={idx} onClick={this.mark}/>          
            </div>
        );
    }
    getComment = (comment)=>{
        if(!comment) return null;
        return(
            <List
                footer={<div>Footer</div>}
                bordered
                dataSource={comment}
                renderItem={item => (<List.Item>{item.user}<br/>{item.content}</List.Item>)}
            />
        )
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
    handleInput(value){
        if(!value){
            alert("输入不能为空");
            return;
        }
        var idx = this.state.postilIdx;
        var name = this.state.username;
        var obj = new Object();
        obj.user = name;
        obj.content = value;

        var comments = this.state.comments;
        var postils = this.state.postils;
        var markList = this.state.markList;
        var agreeList = this.state.agreeList;
        
        if(idx){           //添加评论
            comments[idx].push(obj);
        }
        else{               //添加批注
            obj.agree = 0;
            obj.disagree = 0;
            postils.push(obj);
            comments.push([]);  
            markList.push(0);  
            agreeList.push({agreed:false,disagreed:false});        
        }
        this.setState({
            postils:postils,
            comments:comments,
            markList:markList,
            agreeList:agreeList,
            inputValue:""
        });
    }
    render() {
        const postils = this.state.postils;
        const comments = this.state.comments; 
        return(
            <div id="postil" style={{width:"20%",float:"right", marginRight:"2%",marginTop:"0"}}>
                <Anchor  offsetTop={60}>
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
                <Collapse accordion bordered={false} onChange={this.setPostilIdx}>
                {
                    postils.map((postil,idx)=>{
                        var postil = this.getPostil(postil,idx);
                        var comment = this.getComment(comments[idx]);
                        return(
                            <Panel header={postil} key={idx}>
                                    {comment}
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