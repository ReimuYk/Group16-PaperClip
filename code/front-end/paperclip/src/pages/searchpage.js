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
var username ='';
var searchContent = '';
var tagsFromServer1 = ['tag1-1', 'tag1-2', 'tag1-3', 'tag1-4'];
const tagsFromServer2 = ['2015年及以后', '2010-2014', '2005-2009', '2004年及以前'];
var paperData = [];
var showPaperData = [];
class MyTag extends React.Component {
    state = {
        selectedTags1: [],
        selectedTags2: [],
    };
  
    handleChange1(tag, checked) {
        const { selectedTags1 } = this.state;
        const nextSelectedTags1 = checked
          ? [...selectedTags1, tag]
          : selectedTags1.filter(t => t !== tag);

        this.setState({ 
            selectedTags1: nextSelectedTags1,
        });
        console.log('You are interested in tag 1-: ', nextSelectedTags1);
        /* get data from server that matches checked tags */
    }

    handleChange2(tag, checked){
        const { selectedTags2 } = this.state;
        const nextSelectedTags2 = checked
            ? [...selectedTags2, tag]
            : selectedTags2.filter(t => t !== tag);
        this.setState({
            selectedTags2: nextSelectedTags2,
        });
        showPaperData = [];
        console.log('You are interested in tag 2-: ', nextSelectedTags2);
        const selectedTags1 = this.state.selectedTags1;

        if(nextSelectedTags2.length == 0 && selectedTags1.length == 0){
            showPaperData = paperData;
            this.setState({});
            return;
        }
        for(var i=0;i<selectedTags1.length;++i){
            let tmp = paperData;
            showPaperData = showPaperData.concat(tmp.filter(t => t.source == selectedTags1[i]));
        }
        for(var i=0;i<nextSelectedTags2.length; ++i){
            let tag = nextSelectedTags2[i];
            let tmp = paperData;
            if(tag == '2015年及以后'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2015'));
            }
            if(tag == '2010-2014'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2014' && t.year <= '2010'));
            }
            if(tag == '2005-2009'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2005' && t.year <= '2009'));
            }
            if(tag == '2004年及以前'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year <= '2004'));
            }
        }
        this.setState({});
        console.log(nextSelectedTags2);
        console.log(selectedTags1);
        console.log(showPaperData);
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
                onChange={checked => this.handleChange1(tag, checked)}
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
                onChange={checked => this.handleChange2(tag, checked)}
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
        recommendData: [],
        selectedTags1: [],
        selectedTags2: [],
    }
    constructor(props) {
        super(props);
        this.starnoDESC = this.starnoDESC.bind(this);
        this.starnoASC = this.starnoASC.bind(this);
        this.notenoDESC = this.notenoDESC.bind(this);
        this.notenoASC = this.notenoASC.bind(this);
    }
    inList(list, string){
        for(var i=0;i<list.length; ++i){
            if(string == list[i]) return true;
        }
        return false;
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
        console.log(jsonbody);
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval(responseJson);
                console.log(data);
                let papers = data[0].papers;
                for(var i = 0; i<papers.length; i++){
                    if(papers[i].keyword.length > 50){
                        papers[i].keyword = papers[i].keyword.substring(0,50);
                        papers[i].keyword += '...';
                    }
                    if(papers[i].keyword.length == 0){
                        papers[i].keyword = 'null';
                    }
                }
                paperData = papers;
                showPaperData = paperData;
                tagsFromServer1 = data[2].sourceTags;



                if((username = sessionStorage.getItem('username')) != null){
                    let localStorage = '';
                    localStorage = window.localStorage.getItem(username);
                    let tags = localStorage.split(';');
                    tags.pop();
                    let tagLength1 = tags.length;
                    let tagLength2 = tagsFromServer1.length;
                    let local = [];
                    if(tagLength2 >= 5){
                        local = tagsFromServer1;
                    }
                    else{
                        local = tagsFromServer1;
                        var i = 0;
                        while(local.length <= 5 && i<tagLength1){
                            let string = tags[i];
                            if(this.inList(local, string)){
                                ++i;
                            }
                            else{
                                local = [...local, string];
                                ++i;
                            }
                        }
                    }
                    localStorage = '';
                    for(var i=0; i<local.length; ++i){
                        localStorage += local[i] + ';';
                    }
                    window.localStorage.setItem(username, localStorage);
                }

                that.setState({
                    recommendData: data[1].recommand
                })
            }).catch(function(e){
            console.log("Oops, error");
        })

    }
    starnoDESC(){
        var compare = function(obj1, obj2) {
            var val1 = obj1.starno;
            var val2 = obj2.starno;
            if(val1 < val2){ return 1;}
            else if( val1 > val2) {return -1;}
            else return 0;
        }
        showPaperData = paperData.sort(compare);
        this.setState({});
    }
    starnoASC(){
        var compare = function(obj1, obj2) {
            var val1 = obj1.starno;
            var val2 = obj2.starno;
            if(val1 < val2){ return -1;}
            else if( val1 > val2) {return 1;}
            else return 0;
        }
        showPaperData = paperData.sort(compare);
        this.setState({});
    }
    notenoDESC(){
        var compare = function(obj1, obj2) {
            var val1 = obj1.noteno;
            var val2 = obj2.noteno;
            if(val1 < val2){ return 1;}
            else if( val1 > val2) {return -1;}
            else return 0;
        }
        showPaperData = paperData.sort(compare);
        this.setState({});
    }
    notenoASC(){
        var compare = function(obj1, obj2) {
            var val1 = obj1.noteno;
            var val2 = obj2.noteno;
            if(val1 < val2){ return -1;}
            else if( val1 > val2) {return 1;}
            else return 0;
        }
        showPaperData = paperData.sort(compare);
        this.setState({});
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
                        <Link to={"/paper?paperID="+item.paperID}>
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
                pagination={{pageSize: 12}}
                dataSource={showPaperData}
                renderItem={item => (
                    <List.Item
                        actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                    >
                        <List.Item.Meta
                            title={<a href={"/paper?paperID=" + item.paperID}>{item.title}</a>}
                            description={item.keyword}
                        />
                    </List.Item>
                )}
            />
        )
    }
    renderMenu(){
        const menu = (
            <Menu>
                <Menu.Item>
                    <a onClick={this.starnoDESC}>按收藏量降序</a>
                </Menu.Item>
                <Menu.Item>
                    <a onClick={this.starnoASC}>按收藏量升序</a>
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
    handleChange1(tag, checked) {
        const { selectedTags1 } = this.state;
        const nextSelectedTags1 = checked
            ? [...selectedTags1, tag]
            : selectedTags1.filter(t => t !== tag);

        this.setState({
            selectedTags1: nextSelectedTags1,
        });

        showPaperData = [];
        const selectedTags2 = this.state.selectedTags2;
        if(nextSelectedTags1.length == 0){
            showPaperData = paperData;
        }
        else{
            for(var i=0;i<nextSelectedTags1.length;++i){
                let tmp = paperData;
                showPaperData = showPaperData.concat(tmp.filter(t => t.source == nextSelectedTags1[i]));
            }
        }
        let showPaperData1 = showPaperData;
        for(var i=0;i<selectedTags2.length; ++i){
            let tag = selectedTags2[i];
            let tmp = showPaperData1;
            if(i == 0){
                if(tag == '2015年及以后'){
                    showPaperData = tmp.filter(t => t.year >= '2015');
                }
                if(tag == '2010-2014'){
                    showPaperData = tmp.filter(t => t.year >= '2014' && t.year <= '2010');
                }
                if(tag == '2005-2009'){
                    showPaperData = tmp.filter(t => t.year >= '2005' && t.year <= '2009');
                }
                if(tag == '2004年及以前'){
                    showPaperData = tmp.filter(t => t.year <= '2004');
                }
                continue;
            }
            if(tag == '2015年及以后'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2015'));
            }
            if(tag == '2010-2014'){
                showPaperData = showPaperData.concat(tmp.filter(t => (t.year <= '2014' && t.year >= '2010')));
            }
            if(tag == '2005-2009'){
                showPaperData = showPaperData.concat(tmp.filter(t => (t.year >= '2005' && t.year <= '2009')));
            }
            if(tag == '2004年及以前'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year <= '2004'));
            }
        }
        this.setState({});
    }

    handleChange2(tag, checked){
        const { selectedTags2 } = this.state;
        const nextSelectedTags2 = checked
            ? [...selectedTags2, tag]
            : selectedTags2.filter(t => t !== tag);
        this.setState({
            selectedTags2: nextSelectedTags2,
        });
        console.log('You are interested in tag 2-: ', nextSelectedTags2);
        const selectedTags1 = this.state.selectedTags1;

        showPaperData = [];
        if(selectedTags1.length == 0){
            showPaperData = paperData;
        }
        else{
            for(var i=0;i<selectedTags1.length;++i){
                let tmp = paperData;
                showPaperData = showPaperData.concat(tmp.filter(t => t.source == selectedTags1[i]));
            }
        }
        let showPaperData1 = showPaperData;
        for(var i=0;i<nextSelectedTags2.length; ++i){
            let tag = nextSelectedTags2[i];
            let tmp = showPaperData1;
            if(i == 0){
                if(tag == '2015年及以后'){
                    showPaperData = tmp.filter(t => t.year >= '2015');
                }
                if(tag == '2010-2014'){
                    showPaperData = tmp.filter(t => (t.year <= '2014' && t.year >= '2010'));
                }
                if(tag == '2005-2009'){
                    showPaperData = tmp.filter(t => (t.year >= '2005' && t.year <= '2009'));
                }
                if(tag == '2004年及以前'){
                    showPaperData = tmp.filter(t => t.year <= '2004');
                }
                continue;
            }
            if(tag == '2015年及以后'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2015'));
            }
            if(tag == '2010-2014'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2014' && t.year <= '2010'));
            }
            if(tag == '2005-2009'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year >= '2005' && t.year <= '2009'));
            }
            if(tag == '2004年及以前'){
                showPaperData = showPaperData.concat(tmp.filter(t => t.year <= '2004'));
            }
        }
        this.setState({});
    }
    renderTags = () =>{
        const { selectedTags1, selectedTags2 } = this.state;
        return (
            <div>
                <h6 style={{ marginRight: 8, display: 'inline' }}>标签1:</h6>
                {tagsFromServer1.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags1.indexOf(tag) > -1}
                        onChange={checked => this.handleChange1(tag, checked)}
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
                        onChange={checked => this.handleChange2(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>
                ))}
            </div>
        );
    }
    render() {
        const renderTags = this.renderTags();
        const renderList = this.renderList();
        const renderMenu = this.renderMenu();
        const renderSideBar = this.renderSideBar();
        return(
            <div>
                <NavBar />
                <div className="content" style={{display:"inline", textAlign: 'left'}}>
                    <div className="search" style={{float:"left", width:"60%", marginLeft: "50px", marginTop:"30px"}}>
                        <div className="tag" style={{marginLeft:"0px"}}>
                            {renderTags}
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
