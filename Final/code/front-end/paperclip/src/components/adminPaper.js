import React, {Component} from 'react';
import { Table, Input, Popconfirm, Button, Icon, Row, Col } from 'antd';
import 'antd/dist/antd.css';

const data = [
    {
        key :'1',
        ID:'1',
        paperid: '1',
        title:'title1',
        category:'cate1;cate2;',
        tags:'tag1;tag2;',
        auth:'Read/Download',
        valid:0
    },{
        key :'2',
        ID:'2',
        paperid: '2',
        title:'title2',
        category:'cate1;cate3;',
        tags:'tag1;tag3;',
        auth:'Read',
        valid:1
    }

]

const EditableCell = ({ editable, value, onChange }) => (
    <div>
      {editable
        ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
        : value
      }
    </div>
  );

class AdminPaperList extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: 'ID',
            dataIndex: 'ID',
            key: 'id',
            width: 50,
            render: (text, record) => <EditableCell editable={0} value={text} />
          }, {
            title: 'paperid',
            dataIndex: 'paperid',
            key: 'paperid',
            width:100,
            render: (text, record) => this.renderColumns(text, record, 'paperid')
          }, {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
            width:100,
            render: (text, record) => this.renderColumns(text, record, 'title')
          }, {
            title: 'category',
            dataIndex: 'category',
            key: 'category',
            width:200,
            render: (text, record) => this.renderColumns(text, record, 'category')
          }, {
            title: 'tags',
            dataIndex: 'tags',
            key: 'tags',
            width:200,
            render: (text, record) => this.renderColumns(text, record, 'tags')
          }, {
            title: 'authority',
            dataIndex: 'auth',
            key: 'auth',
            width:150,
            render: (text, record) => this.renderColumns(text, record, 'auth')
          }, {
            title: 'valid',
            dataIndex: 'valid',
            key: 'valid',
            width:75,
            render: (text, record) => this.renderColumns(text, record, 'valid')
          }, {
            title: '编辑',
            dataIndex: 'edit',
            key: 'edit',
            width: 200,
            render: (text, record) => {
                const { editable } = record;
                return (
                  <div className="editable-row-operations">
                    {
                      editable ?
                        <span>
                          <a onClick={() => this.save(record.key)}>Save</a>
                          <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                            <a style={{marginLeft:20}}>Cancel</a>
                          </Popconfirm>
                        </span>
                        : <span>
                            <a onClick={() => this.edit(record.key)}>Edit</a>
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.key)}>
                              <a style={{marginLeft:20}}>Del</a>
                            </Popconfirm>
                          </span>
                    }
                  </div>
                );
              },
            }
          ]
        this.state = { data };
        this.cacheData = data.map(item => ({ ...item }));
      }
      state = {
        filterDropdownVisible: false,
        data: data,
        searchText: '',
        filtered: false,
      };
      onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
      }
      onSearch = () => {
        console.log('onsearch')
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
          filterDropdownVisible: false,
          filtered: !!searchText,
          data: data.map((record) => {
            console.log('data search')
            const match = record.name.match(reg);
            if (!match) {
              return null;
            }
            console.log('record',record)
            return ( {
              ...record,
              name: (
                <span>
                  {record.name.split(reg).map((text, i) => (
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                  ))}
                </span>
              ),
            });
          }).filter(record => !!record),
        });
      }
      renderColumns(text, record, column) {
        return (
          <EditableCell
            editable={record.editable}
            value={text}
            onChange={value => this.handleChange(value, record.key, column)}
          />
        );
      }
      handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        console.log('target',target);
        console.log('value',value)
        console.log('key',key)
        console.log('column',column)
        if (target) {
          target[column] = value;
          this.setState({ data: newData });
        }
      }
      edit(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.setState({ data: newData });
        }
      }
      save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          delete target.editable;
          this.setState({ data: newData });
          this.cacheData = newData.map(item => ({ ...item }));
        }
        // let url='http://localhost:8080/services/modifydata'
        // let options={}
        // options.method='POST'
        // options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json', }
        // var i;
        // for (i=0;i<newData.length;i++){
        //   if(newData[i].key==key){
        //     options.body=JSON.stringify(newData[i])
        //   }
        // }
        // console.log(options);
        // fetch(url,options)
        //   .then(response=>response.text())
        //   .then(responseJson=>{
        //     console.log(responseJson);
        // }).catch(function(e) {
        //       console.log("Oops, error");
        // });
      }
      delete(key) {
        // for (var i=0;i<data.length;i++){
        //   console.log(i,data[i],key)
        //   if (data[i].key===key){
        //     let url='http://localhost:8080/services/deletedata'
        //     let options={}
        //     options.method='POST'
        //     options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json', }
        //     options.body=JSON.stringify(data[i]);
        //     fetch(url,options)
        //       .then(response=>response.text())
        //       .then(responseJson=>{
        //         console.log(responseJson);
        //     }).catch(function(e) {
        //           console.log("Oops, error");
        //     });
        //     data.splice(i,1);
        //     this.setState({data:data})
        //   }
        // }
      }
      cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.setState({ data: newData });
        }
      }
      render() {
        return (
            <div style={{width:1200,margin:'auto'}}>
            <Row style={{textAlign:'left'}}>
                <Col style={{display:'inline'}}><Input addonBefore="paperid" style={{width:'200px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Input addonBefore="title" style={{width:'200px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Input addonBefore="category" style={{width:'200px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Input addonBefore="tags" style={{width:'200px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Input addonBefore="authority" style={{width:'200px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Input addonBefore="valid" style={{width:'100px'}}/></Col>
                <Col style={{display:'inline',marginLeft:3}}><Button type="primary" style={{width:'80px'}}>Search</Button></Col>
            </Row>
            
            <Table bordered dataSource={this.state.data} columns={this.columns} />
            </div>
        );
      }
}

export default AdminPaperList;