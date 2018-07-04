import React, { Component } from 'react';
import { Input, Icon, Button, Table, Tag } from 'antd';
import NavBar from '../components/nav-bar'

const { CheckableTag } = Tag;

/* fake data...
 * 
 * should get 'tags' from server
 */

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
const paper = [{
    key: '1',
    title: 'title 1',
    author: 'author 1',
    keyWord: 'key word 1',
    readno: '233',
    noteno: '5',
},{
    key: '2',
    title: 'title 2',
    author: 'author 2',
    keyWord: 'key word 2, key word 3',
    readno: '555',
    noteno: '42',
},{
    key: '3',
    title :'title 3',
    author: 'author 1',
    keyWord: 'key word 1, key word 2',
    readno: '123',
    noteno: '2',
}]

class Search extends Component{
    // state = {
    //     filterDropdownVisible: false,
    //     searchText: '',
    //     filtered: false,
    // }
    componentWillMount = () => {
        /* get data ( paper ) from backend */
    }
    // onInputChange = (e) => {
    //     this.setState({ searchText: e.target.value });
    // }
    // onSearch = () => {
    //     const { searchText } = this.state;
    //     console.log('search:', searchText);
    //     const reg = new RegExp(searchText, 'gi');
    //     this.setState({
    //       filterDropdownVisible: false,
    //       filtered: !!searchText,
    //       paper: paper.map((record) => {
    //         const match = record.keyWord.match(reg);
    //         if (!match) {
    //           return null;
    //         }
    //         return {
    //           ...record,
    //           name: (
    //             <span>
    //               {record.keyWord.split(reg).map((text, i) => (
    //                 i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
    //               ))}
    //             </span>
    //           ),
    //         };
    //       }).filter(record => !!record),
    //     });
    // }
    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },{
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },{
            title: '关键词',
            dataIndex: 'keyWord',
            key: 'keyWord',
            // filterDropdown: (
            //     <div className="custom-filter-dropdown">
            //       <Input
            //         ref={ele => this.searchInput = ele}
            //         placeholder="输入关键字查询"
            //         value={this.state.searchText}
            //         onChange={this.onInputChange}
            //         onPressEnter={this.onSearch}
            //       />
            //       <Button type="primary" onClick={this.onSearch}>Search</Button>
            //     </div>
            // ),
            // filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            // filterDropdownVisible: this.state.filterDropdownVisible,
            // onFilterDropdownVisibleChange: (visible) => {
            //     this.setState({
            //         filterDropdownVisible: visible,
            //     }, () => this.searchInput && this.searchInput.focus());
            // },
        },{
            title: '阅读量',
            dataIndex: 'readno',
            key: 'readno',
            sorter: (a, b) => a.readno - b.readno,
        },{
            title: '笔记量',
            dataIndex: 'noteno',
            key: 'noteno',
            sorter: (a, b) => a.noteno - b.noteno,
        }]
        return(
            <div>
                <NavBar />
                <MyTag />
                <Table columns={columns} dataSource={paper} />
            </div>
        )
    }
}

export default Search;
