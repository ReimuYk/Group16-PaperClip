import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import { Anchor } from 'antd';
import logo from '.././logo.svg';
import NavBar from '.././components/nav-bar'

const Search = Input.Search;
const Option = Select.Option;

class Home extends Component{
    constructor(props){
        super(props);

        this.changeSearchIdx = this.changeSearchIdx.bind(this);
        this.selectChange = this.selectChange.bind(this);
        this.click = this.click.bind(this);
       
        this.state = {
            isLog:false,
            searchIdx: "empty"
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
    click(e){
        this.setState({isLog:true});
    }


    renderNav(){
        if(this.state.isLog){
            return(
                <Anchor>
                <Row type="flex" align="middle" justify="center">
                    <Col span={5}><img src={logo} width="60px" height="60px" alt="logo"/>Paperclip</Col>
                    <Col span={1} offset={17}><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /></Col>
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
                    <Col span={1} offset={17}><Avatar icon="user" /></Col>
                    <Col span={1}><Link to="/login">Log in</Link></Col>
                </Row>
                </Anchor>
            )
        }
    }

    renderSearch(){
        const selectBefore = (
            <Select defaultValue="title" style={{ width: 90 }} onChange={this.selectChange}>
                <Option value="title">标题</Option>
                <Option value="author">作者</Option>
            </Select>
        );
        const buttonAfter = (
            <Link to={"/search/"+this.state.searchIdx}>Search</Link>
        )        
        return(
            <div id="search">
                <Search
                addonBefore={selectBefore}
                placeholder="input search text"
                enterButton={buttonAfter}
                size="large"
                onChange={this.changeSearchIdx}
                />
            </div>
        )
    }

    renderRecomment(){
        const data = [
            {
              title: 'Ant Design Title 1',
            },
            {
              title: 'Ant Design Title 2',
            },
            {
              title: 'Ant Design Title 3',
            },
            {
              title: 'Ant Design Title 4',
            },
          ];
          
        return(
            <Row>
                <Col span={12}>
                    <Carousel autoplay>
                        <div><h3>论文1</h3></div>
                        <div><h3>论文2</h3></div>
                        <div><h3>论文3</h3></div>
                        <div><h3>论文4</h3></div>
                    </Carousel>
                </Col>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={<Link to="/">{item.title}</Link>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />
                </Col>
            </Row>
        )
    }
    
    render(){
        const nav = this.renderNav();
        const search = this.renderSearch();
        const recomment = this.renderRecomment();
        return(
            <div>
                {nav}
                {search}
                {recomment}
            </div>
        )
    }
}

export default Home;
