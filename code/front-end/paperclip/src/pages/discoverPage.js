import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar, Card, Icon } from 'antd';
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

    renderRecommendNote(){
        const listData = [];
        for (let i = 0; i < 23; i++) {
            listData.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
             </span>
        );
        return (
        <div style={{ width:"60%", float: "left", marginBottom: "50px"}}>
            <div class="icon" style={{width: "100px", marginBottom: "30px"}}>
                <Icon type="bars" />
                <span style={{marginLeft: "20px"}}>推荐笔记</span>
            </div>
            <List
                span={16}
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                footer={<div><b>ant design</b> footer part</div>}
                renderItem={item => (
                    <List.Item
                        span={16}
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar} />}
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                        />
                        {item.content}
                    </List.Item>
                )}
            />
        </div>
        )
    }

    renderRecommendPaper(){
        const data = [
            {
              title: '论文1',
                description:'empty'
            },
            {
              title: '论文2',
                description:'empty'
            },
            {
              title: '论文3',
                description:'empty'
            },
            {
              title: '论文4',
                description:'empty'
            },
          ];
        const {Meta} = Card;
          
        return(
        <div style={{ width: "60%"}}>
            <div class="icon" style={{width: "100px", marginBottom: "30px"}}>
                <Icon type="bars" />
                <span style={{marginLeft: "20px"}}>推荐论文</span>
            </div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta
                                title={item.title}
                                description={item.description}
                            />
                        </Card>,
                    </List.Item>
                )}
            />
        </div>
        )
    }

    renderSideBar(){
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
        <div class="sidebar" style={{width: "20%", float: "right", marginRight: "10%"}}>
            <div class="icon" style={{width: "130px", marginBottom: "30px"}}>
                <Icon type="bars" />
                <span style={{marginLeft: "20px"}}>我关注的话题</span>
            </div>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item actions={[<a>删除</a>]}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </div>
        )
    }
    
    render(){
        const recommendNote = this.renderRecommendNote();
        const recommendPaper = this.renderRecommendPaper();
        const sidebar = this.renderSideBar();
        return(
            <div>
               <NavBar />
                <div class="content" style={{marginLeft: "30px", marginTop: "30px", display: "inline-block"}}>
                    {recommendNote}
                    {sidebar}
                    {recommendPaper}
                </div>
            </div>
        )
    }
}

export default Discover;
