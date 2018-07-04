import React, { Component } from 'react';

/* should get from server */
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';

class UserDoc extends Component{
    componentWillMount = () => {
        /* get specific info of papers */
    }
    render(){
        return(
            <div>
                这是用户文档
            </div>
        )
    }
}

export default UserDoc;
