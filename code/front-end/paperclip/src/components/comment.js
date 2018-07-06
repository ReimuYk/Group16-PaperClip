import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor} from 'antd';
const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;

class Comment extends Component{
    constructor(props){
        super(props);

        this.getReplyName = this.getReplyName.bind(this);
    }
    getReplyName(e){
        var name = e.target.id;
        //console.log("child:"+name);
        this.props.handleReply(name);
    }
    render(){
        const comment = this.props.data;
        if(!comment) return null;
        return(
            <List
                bordered={false}
                dataSource={comment}
                renderItem={item => (
                        <List.Item >                        
                            <Icon type="user" />
                            <a href="#">{item.user}</a>
                            <br/>
                            {item.content}
                            <Button id={item.user} onClick={this.getReplyName}
                            shape="circle" icon="message"
                            />                        
                        </List.Item>
                    )}
            />
        )
    }
}

export default Comment;