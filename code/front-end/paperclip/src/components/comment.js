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
                        <List.Item 
                        style={{textAlign:"left"}}
                        actions={[<Button id={item.user} onClick={this.getReplyName}
                        shape="circle" icon="message"
                        /> ]}> 
                        <List.Item.Meta
                        avatar={<Avatar shape="square" size="small" icon="user" />}
                        title={<a href="#">{item.user}</a>}
                        description={<p style={{width:"130%"}}>{item.content}</p>}
                        /> 
                        </List.Item>
                    )}
            />
        )
    }
}

export default Comment;