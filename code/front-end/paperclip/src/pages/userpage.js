import React, { Component } from 'react';
import { Icon, Divider } from 'antd';
import '../css/style.css';

/* should get from server */
import uh1 from '.././statics/uh.jpg';
const followno = 233;
const fensno   = 23;

class User extends Component{
    render() {
        return(
            <div id='u'>
                <div>
                <div id='u1'>
                    <div id='u1-1'>
                        <img alt='' src={uh1}
                        style={{width:130,height:'130px',borderRadius:'50%',margin:'0 auto',display:'block'}}
                        />
                    </div>
                    
                    <div id='u1-2'>
                        <h6>这是用户名</h6> 
                        <p>这是用户的描述</p>  
                    </div>
                    <div id='u1-3'>
                        <p>
                        <a>专注:</a>
                        <a>{ followno }</a>
                        <a>     </a>
                        <a>  粉丝:</a>
                        <a>{ fensno }</a>

                        <div></div>

                        </p>
                        <span>
                        <Icon type='mail' style={{ fontSize: 30, color: '#08c' }} />
                        <span>
                            发私信
                        </span>
                        </span>
                        <span>
                        <Icon type="plus-square-o" style={{ fontSize: 30, color: '#08c' }} />
                        <span>
                            关注
                        </span>
                        </span>
                    </div>
                </div>
                </div>
                <Divider type="vertical" />
                <div>
                <div id='u2'>
                    <div id='u2-1'>
                        <p>动态1</p>
                        <p>动态2</p>
                        <p>动态3</p>
                        <p>动态4</p>
                        <p>动态5</p>
                    </div>
                    <div id='u2-2'>
                        <p>收藏论文</p>
                        <p>收藏的笔记</p>
                        <p>写过的笔记</p>
                        <p>写过的文档</p>
                        <p>写过的批注</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default User;
