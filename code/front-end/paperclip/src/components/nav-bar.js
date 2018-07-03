import React, { Component } from 'react';
import logo from '.././logo.svg';
import { Input,Icon, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Anchor } from 'antd';
import {Link} from 'react-router-dom';
const Search = Input.Search;

class NavBar extends Component{
    constructor(props){
        super(props);
        this.changeSearchIdx = this.changeSearchIdx.bind(this);
        this.state = {
            isLog:false,
            searchIdx:"empty"
        }
    }

    changeSearchIdx(e){
        var idx = e.target.value;
        if(idx == ""){
            idx = "empty";
        }
        this.setState({searchIdx:idx});
    }

    render() {
        const buttonAfter = (
            <Link to={"/search/"+this.state.searchIdx}>
                <Icon type="search" />
            </Link>
        )        
        const search = (
                <Search
                placeholder="input search text"
                enterButton={buttonAfter}
                onChange={this.changeSearchIdx}
                />
        )
        if(this.state.isLog){
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={5}><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Col>
                        <Col span={8}>{search}</Col>
                        <Col span={1} offset={9}><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /></Col>
                        <Col span={1}>user</Col>
                    </Row>
                </Anchor>
            )
        }
        else{
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={5}><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Col>
                        <Col span={8}>{search}</Col>
                        <Col span={1} offset={9}><Avatar icon="user" /></Col>
                        <Col span={1}><Link to="/login">Log in</Link></Col>
                    </Row>
                </Anchor>
            )
        }
    }
}

export default NavBar;