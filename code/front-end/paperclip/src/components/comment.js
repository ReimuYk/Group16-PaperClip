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
                size="small"
                pagination={{pageSize: 3,size:"small"}}
                renderItem={item => (
                        <List.Item 
                        style={{textAlign:"left"}}
                        actions={[<Button id={item.user} onClick={this.getReplyName}
                        size="small" style={{fontSize:"13px"}}><Icon type="rollback" style={{fontSize:"12px"}}/>回复</Button> ]}> 
                        <List.Item.Meta
                        avatar={<Avatar shape="square" size="small" src={item.avatar} />}
                        title={<a href={"/viewpage?username="+item.user}>{item.user}</a>}
                        description={<p style={{width:"130%"}}>{item.content}</p>}
                        /> 
                        </List.Item>
                    )}
            />
        )
    }
}

export default Comment;