import React, { Component } from 'react';
import { Menu, Icon, Dropdown, Tag, Card, List, Divider ,Spin} from 'antd';
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
        isLoading:true
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
        jsonbody.needImg = 0;
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
                    let tagLength1 = 0;
                    let tags=[];
                    localStorage = window.localStorage.getItem(username);
                    if(localStorage != null){
                        tags = localStorage.split(';');
                        tags.pop();
                        tagLength1 = tags.length;
                    }
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
                    recommendData: data[1].recommand,
                    isLoading:false
                })
            })/*.catch(function(e){
            console.log("Oops, error");
        })*/

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
            <div class="sidebar">
                <div class="icon" style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
                borderRadius:"2px",padding:"0 20px",width:"85%",marginBottom:"1%"}}>
                    <Icon type="smile" style={{color:"	#5F9EA0"}}/>
                    <span style={{marginLeft: "10px"}}>你可能感兴趣</span>
                </div>
                <div style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
                borderRadius:"2px",padding:"0 20px",width:"85%"}}>
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
            </div>
        )
    }
    renderList(){
        if(this.state.isLoading){
            return(
                <div style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
                borderRadius:"2px",padding:"5px 20px",marginTop:"1%",marginBottom:"2%"}}>
                <Spin size="large" />
                </div>
            );
        }
        return(
            <div style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
            borderRadius:"2px",padding:"5px 20px",marginTop:"1%",marginBottom:"2%"}}>
            <List
                pagination={{pageSize: 14}}
                dataSource={showPaperData}
                renderItem={item => (
                    <List.Item
                        actions={[<span>收藏量：{item.starno}</span>, <span>笔记量：{item.noteno}</span>]}
                    >
                        <List.Item.Meta
                            title={<a href={"/paper?paperID=" + item.paperID}>
                            <Icon type="file-text" style={{color:"#6495ED"}}/>{item.title}</a>}
                            description={item.keyword}
                        />
                    </List.Item>
                )}
            />
            </div>
        )
    }
    renderMenu(){
        const menu = (
            <Menu mode="horizontal" style={{textAlign:"right"}} >
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
            <Dropdown overlay={menu} >
                <div className="ant-dropdown-link"
                style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
                         borderRadius:"2px",padding:"0 20px",lineHeight:"40px",marginTop:"1%",marginBottom:"2%"
                         ,textAlign:"right"}}>
                    请选择排序方式 <Icon type="down" />
                </div>
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
                    showPaperData = tmp.filter(t => t.year <= '2014' && t.year >= '2010');
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
                showPaperData = showPaperData.concat(tmp.filter(t => t.year <= '2014' && t.year >= '2010'));
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
            <div style={{backgroundColor:"white",lineHeight:"40px",boxShadow:"0px 1px 3px #BDBCBC",
            borderRadius:"2px",padding:"0 20px"}}>
                <h6 
                style={{ marginRight:"15",lineHeight:"40px",display: 'inline',fontSize:"14px",fontFamily:"Microsoft Yahei" }}>
                <Icon type="tag-o" style={{ fontSize: 14, color: '#4682B4' }}/>{" 论文来源 "}</h6>
                <Divider type="horizonal"/>
                {tagsFromServer1.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags1.indexOf(tag) > -1}
                        onChange={checked => this.handleChange1(tag, checked)}
                        style={{fontSize:"12px",fontFamily:"Microsoft JhengHei",padding:"0 5px"}}
                    >
                        {tag}
                    </CheckableTag>
                ))}
                <div></div>
                <h6 
                style={{ marginRight:"15",lineHeight:"40px",display: 'inline',fontSize:"14px",fontFamily:"Microsoft Yahei" }}>
                <Icon type="calendar" style={{ fontSize: 14, color: '#4682B4' }}/>{" 发表年份 "}</h6>
                <Divider type="horizonal"/>
                {tagsFromServer2.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags2.indexOf(tag) > -1}
                        onChange={checked => this.handleChange2(tag, checked)}
                        style={{fontSize:"12px",fontFamily:"Microsoft JhengHei",padding:"0 5px"}}
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
                <div className="content" style={{display:"flex", textAlign: 'left'}}>
                    <div className="search" style={{width:"60%", marginLeft: "8%", marginTop:"30px",display:"block"}}>
                        <div className="tag" style={{marginLeft:"0px"}}>
                            {renderTags}
                        </div>
                        <div className="menu" style={{marginLeft: "0px"}}>
                            {renderMenu}
                        </div>
                        {renderList}
                    </div>
                    <div className="sidebar" style={{marginTop:"31px",display:"block",width:"25%",marginLeft:"2%"}}>
                        {renderSideBar}
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
