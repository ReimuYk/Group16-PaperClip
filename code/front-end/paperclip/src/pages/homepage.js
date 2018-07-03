import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List } from 'antd';
import { Row, Col } from 'antd';

const Search = Input.Search;
const Option = Select.Option;

class homepage extends Component{
    constructor(props){
        super(props);
        this.search = this.search.bind(this);
        this.selectChange = this.selectChange.bind(this);
    }

    search(value){
        console.log("search : " + value);
    }
    selectChange(value){
        console.log("select idx: " + value);
    }


    renderNav(){
        return(
            <div>导航栏-暂时还未实现</div>
        )
    }

    renderSearch(){
        const selectBefore = (
            <Select defaultValue="title" style={{ width: 90 }} onChange={this.selectChange}>
              <Option value="title">标题</Option>
              <Option value="author">作者</Option>
            </Select>
          );
        return(
            <div id="search">
                <Search
                addonBefore={selectBefore}
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={this.search}
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

export default homepage;