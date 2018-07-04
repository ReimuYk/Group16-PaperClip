import React, { Component } from 'react';
import logo from '.././logo.svg';
import { Input,Icon, Avatar, Select } from 'antd';
import { Row, Col } from 'antd';
import { Anchor } from 'antd';
import {Link} from 'react-router-dom';
import {log} from '../pages/loginpage';
import {log1} from '../pages/RegisterPage';

const Search = Input.Search;
const Option = Select.Option;

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
    selectChange(value){
        console.log("select idx: " + value);
    }

    render() {
        const selectBefore = (
            <Select defaultValue="title" style={{ width: 90 }} onChange={this.selectChange}>
                <Option value="title">标题</Option>
                <Option value="author">作者</Option>
            </Select>
        );
        const buttonAfter = (
            <Link to={"/search/"+this.state.searchIdx}>
                <Icon type="search" />
            </Link>
        )        
        const search = (
                <Search
                addonBefore={selectBefore}
                placeholder="input search text"
                enterButton={buttonAfter}
                onChange={this.changeSearchIdx}
                />
        )
        if(log||log1){
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={5}><Link to="/"><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Link></Col>
                        <Col span={1}><Link to='/discover'>首页</Link></Col>
                        <Col span={1}><Link to='/discover'>发现</Link></Col>
                        <Col span={8}>{search}</Col>
                        <Col span={1} offset={7}>
                            <Link to="/user"><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /></Link>
                        </Col>
                        <Col span={1}>user</Col>
                    </Row>
                </Anchor>
            )
        }
        else{
            return(
                <Anchor>
                    <Row type="flex" align="middle" justify="center">
                        <Col span={5}><Link to="/"><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Link></Col>
                        <Col span={1}><Link to='/discover'>首页</Link></Col>
                        <Col span={1}><Link to='/discover'>发现</Link></Col>
                        <Col span={8}>{search}</Col>
                        <Col span={1} offset={7}><Avatar icon="user" /></Col>
                        <Col span={1}><Link to="/login">Log in</Link></Col>
                    </Row>
                </Anchor>
            )
        }
    }
}

export default NavBar;