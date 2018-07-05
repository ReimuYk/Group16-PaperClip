import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar, Button, Spin } from 'antd';
import { Row, Col } from 'antd';
import NavBar from '../components/nav-bar';
import reqwest from 'reqwest';

const Search = Input.Search;
const Option = Select.Option;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class LoadMoreList extends React.Component {
    state = {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
    }

    componentDidMount() {
        this.getData((res) => {
            this.setState({
                loading: false,
                data: res.results,
            });
        });
    }

    getData = (callback) => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: (res) => {
                callback(res);
            },
        });
    }

    onLoadMore = () => {
        this.setState({
            loadingMore: true,
        });
        this.getData((res) => {
            const data = this.state.data.concat(res.results);
            this.setState({
                data,
                loadingMore: false,
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
        });
    }

    render() {
        const { loading, loadingMore, showLoadingMore, data } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : null;
        return (
            <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
                    </List.Item>
                )}
            />
        );
    }
}
class Home extends Component{
    constructor(props){
        super(props);       
        
    }
    render(){
        return(
            <div>
                <NavBar />
                <div style={{width:"70%"}}>
                    <div className="content" style={{marginTop:"30px", marginLeft:"100px", float:"left"}}>
                        <div className="starTopic" style={{marginTop:"10px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你关注的话题：</span>
                        </div>
                        <LoadMoreList/>
                        <div className="starUser" style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你关注的人最近：</span>
                        </div>
                        <LoadMoreList/>
                        <div className="starPaper" style={{marginTop:"30px", marginLeft:"0px", marginBottom:"10px",textAlign:"left"}}>
                            <span>你收藏的文章最近：</span>
                        </div>
                        <LoadMoreList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

