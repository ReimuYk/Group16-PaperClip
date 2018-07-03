import React, { Component } from 'react';
import { Input, Icon, Button, Table } from 'antd';

/* fake data...
 * 
 * should get 'paper' from database 
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
    state = {
        chosenTag: '',
    }
    componentWillMount = () => {
        /* get data ( paper ) from backend */
    }
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
                <Table columns={columns} dataSource={paper} />
            </div>
        )
    }
}

export default Search;
