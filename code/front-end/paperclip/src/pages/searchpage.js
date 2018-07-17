import React, { Component } from 'react';
import { Menu, Icon, Dropdown, Tag, Card, List, Avatar } from 'antd';
import NavBar from '../components/nav-bar'
import {Link} from 'react-router-dom';
import { IPaddress } from '../App'
const { CheckableTag } = Tag;

/* fake data...
 * 
 * should get 'tags' from server
 */
var searchContent = '';
const tagsFromServer1 = ['tag1-1', 'tag1-2', 'tag1-3', 'tag1-4'];
const tagsFromServer2 = ['tag2-1', 'tag2-2', 'tag2-3', 'tag2-4'];

class MyTag extends React.Component {
    state = {
        selectedTags1: [],
        selectedTags2: [],
    };
  
    handleChange(tag, checked) {
        const { selectedTags1, selectedTags2 } = this.state;
        const nextSelectedTags1 = checked
          ? [...selectedTags1, tag]
          : selectedTags1.filter(t => t !== tag);
        const nextSelectedTags2 = checked
          ? [...selectedTags2, tag]
          : selectedTags2.filter(t => t !== tag);
        
        this.setState({ 
            selectedTags1: nextSelectedTags1,
            selectedTags2: nextSelectedTags2,
        });
        console.log('You are interested in tag 1-: ', nextSelectedTags1);
        console.log('You are interested in tag 2-: ', nextSelectedTags2);
        /* get data from server that matches checked tags */
    }
  
    render() {
        const { selectedTags1, selectedTags2 } = this.state;
        return (
          <div>
            <h6 style={{ marginRight: 8, display: 'inline' }}>标签1:</h6>
            {tagsFromServer1.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags1.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
            <div></div>
            <h6 style={{ marginRight: 8, display: 'inline' }}>标签2:</h6>
            {tagsFromServer2.map(tag => (
              <CheckableTag
                key={tag}
                checked={selectedTags2.indexOf(tag) > -1}
                onChange={checked => this.handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        );
    }
    
}

/* fake data...
 * 
 * should get 'paper' from server
 */

const { Meta } = Card;

class Search extends Component{
    state = {
        paperData: [],
        recommendData: []
    }
    constructor(props) {
        super(props);
        this.readnoDESC = this.readnoDESC.bind(this);
        this.readnoASC = this.readnoASC.bind(this);
        this.notenoDESC = this.notenoDESC.bind(this);
        this.notenoASC = this.notenoASC.bind(this);
    }
    componentWillMount = () => {
        /* get searchContent from url */
        searchContent = this.props.location.search.substring(9);//8 == 'content='.length+1
        /* get info from server */
        let that = this;
        /* get search content according to username */
        let jsonbody = {};
        jsonbody.searchText = searchContent;
        let url = IPaddress + 'service/search';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                let papers = data[0].papers;
                for(var i = 0; i<papers.length; i++){
                    if(papers[i].keyword.length > 15){
                        papers[i].keyword = papers[i].keyword.substring(0,15);
                        papers[i].keyword += '...';
                    }
                    if(papers[i].keyword.length == 0){
                        papers[i].keyword = 'null';
                    }
                }
                that.setState({
                    paperData: papers,
                    recommendData: data[1].recommand
                })
            }).catch(function(e){
            console.log("Oops, error");
        })

    }
    readnoDESC(){
        let paper = this.state.paperData;
        var compare = function(obj1, obj2) {
            var val1 = obj1.readno;
            var val2 = obj2.readno;
            if(val1 < val2){ return 1;}
            else if( val1 > val2) {return -1;}
            else return 0;
        }
        this.setState({
            paperData: paper.sort(compare)
        })
    }
    readnoASC(){
        let paper = this.state.paperData;
        var compare = function(obj1, obj2) {
            var val1 = obj1.readno;
            var val2 = obj2.readno;
            if(val1 < val2){ return -1;}
            else if( val1 > val2) {return 1;}
            else return 0;
        }
        this.setState({
            paperData: paper.sort(compare)
        })
    }
    notenoDESC(){
        let paper = this.state.paperData;
        var compare = function(obj1, obj2) {
            var val1 = obj1.noteno;
            var val2 = obj2.noteno;
            if(val1 < val2){ return 1;}
            else if( val1 > val2) {return -1;}
            else return 0;
        }
        this.setState({
            paperData: paper.sort(compare)
        })
    }
    notenoASC(){
        let paper = this.state.paperData;
        var compare = function(obj1, obj2) {
            var val1 = obj1.noteno;
            var val2 = obj2.noteno;
            if(val1 < val2){ return -1;}
            else if( val1 > val2) {return 1;}
            else return 0;
        }
        this.setState({
            paperData: paper.sort(compare)
        })
    }
    renderSideBar(){
        return(
            <div class="sidebar" style={{width: "20%", float: "right", marginRight: "10%"}}>
                <div class="icon" style={{width: "130px", marginBottom: "30px"}}>
                    <Icon type="bars" />
                    <span style={{marginLeft: "20px"}}>你可能感兴趣:</span>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.recommendData}
                    renderItem={item => (
                        <Link to={"/paper/"+item.paperID}>
                            <List.Item>
                                <List.Item.Meta
                                    title={<a>{item.title}</a>}
                                    description={item.keyword}
                                />
                            </List.Item>
                        </Link>
                    )}
                />
            </div>
        )
    }
    renderList(){
        return(
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={this.state.paperData}
                renderItem={item => (
                <List.Item>
                    <Card
                        style={{ width: 200 }}
                        actions={[<span>阅读量：{item.readno}</span>, <span>笔记数：{item.noteno}</span>]}
                    >
                        <Meta
                            title={
                                <Link to={"/paper/" + item.paperID}>
                                    {item.title}
                                </Link>}
                            description={item.keyword}
                        />
                    </Card>
                </List.Item>
                )}
            />
        )
    }
    renderMenu(){
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.readnoDESC}>按阅读量降序</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.readnoASC}>按阅读量升序</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.notenoDESC}>按笔记量降序</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.notenoASC}>按笔记量升序</a>
                </Menu.Item>
            </Menu>
        );
        return(
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                    请选择排序方式 <Icon type="down" />
                </a>
            </Dropdown>
        )
    }
    render() {

        const renderList = this.renderList();
        const renderMenu = this.renderMenu();
        const renderSideBar = this.renderSideBar();
        return(
            <div>
                <NavBar />
                <div className="content" style={{display:"inline"}}>
                    <div className="search" style={{float:"left", width:"60%", marginLeft: "50px", marginTop:"30px"}}>
                        <div className="tag" style={{marginLeft:"0px", width:"300px"}}>
                            <MyTag />
                        </div>
                        <div className="menu" style={{marginLeft: "0px", width:"150px", marginTop: "10px", marginBottom:"50px"}}>
                            {renderMenu}
                        </div>
                        {renderList}
                    </div>
                    <div className="sidebar" style={{marginTop: "70px"}}>
                        {renderSideBar}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
