import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor} from 'antd';
import Comment from "./comment";
import emitter from '.././util/events';
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
            data:[
                {
                    postils:{user:"baibai",content:"我觉得OK",agree:10,disagree:2},
                    comments:[{user:"b",content:"1"},{user:"ai",content:"2"}],
                    marked:0,
                    agreement:{agreed:false,disagreed:false}
                },
                {
                    postils:{user:"haliai",content:"我觉得不行",agree:2,disagree:1},
                    comments:[{user:"1",content:"asdd"},{user:"a445i",content:"倍v"}],
                    marked:0,
                    agreement:{agreed:false,disagreed:false}
                }
            ],
            postilIdx:null,
            inputValue:"",
        }
    }
    componentWillMount(){
    }
    componentDidMount() {
        this.postilEvent = emitter.addListener('changePostils', (data) => {
            //alert("postils change!");
            this.setState({
                data:data
            })
        });
    }
    componentWillUnmount() {
        //emitter.removeListener(this.postilEvent);
    }
    refreshStat(pos,flag){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = 'testuser1';
        jsonbody.posID = pos.postils.posID;
        jsonbody.marked = pos.marked;
        jsonbody.agreement = pos.agreement;
        jsonbody.flag = flag;
        var url = 'http://192.168.1.159:8080/service/statPostil';
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

        var data = this.state.data;
        
        if(idx){           //添加评论
            data[idx].comments.push(obj);
        }
        else{               //添加批注
            obj.agree = 0;
            obj.disagree = 0;
            data.push({
                postils:obj,
                comments:[],
                marked:0,
                agreement:{agreed:false,disagreed:false}
            })
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