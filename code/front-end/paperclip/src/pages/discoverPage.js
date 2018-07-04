import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import NavBar from '.././components/nav-bar';

const Search = Input.Search;
const Option = Select.Option;

class Discover extends Component{
    constructor(props){
        super(props);

        this.changeSearchIdx = this.changeSearchIdx.bind(this);
        this.selectChange = this.selectChange.bind(this);
       
        this.state = {
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
        const recomment = this.renderRecomment();
        return(
            <div>
               <NavBar />
                {recomment}
            </div>
        )
    }
}

export default Discover;

