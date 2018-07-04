import React, { Component } from 'react';

/* should get from server */
const userID = 1;
const userName = '用户名';
const userIntro = '用户描述';

class UserComment extends Component{
    componentWillMount = () => {
        /* get specific info of papers */
    }
    render(){
        return(
            <div>
                这是用户批注页
            </div>
        )
    }
}

export default UserComment;
