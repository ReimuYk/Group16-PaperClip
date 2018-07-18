import React, {Component} from 'react';
import {  Layout, Icon,Upload, message,Button, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar.js';
import '../css/style.css';
import { IPaddress } from '../App'
import User from './userpage.js';
import url from '../statics/uh.jpg'
/* fake data */

const { Header, Content, Sider } = Layout;
var username = '';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

class UserSetting extends Component{
    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
        this.changeMenuKey = this.changeMenuKey.bind(this);
        this.state = {
            collapsed: false,
            content:'',
            menuKey:1,
            openEdit:false,
            editIdx:null,
            loading: false,
            imageUrl:url,
            data:[
                {
                idx:0, title: '性别',info:"男"
                },
                {
                idx:1, title: '一句话描述',info:"蛇精病吃葫芦娃"
                },
                {
                idx:2, title: '居住地',info:"思源湖底"
                }
            ],
            inputContent:''
        }
    }
    componentWillMount(){
        username = sessionStorage.getItem('username');
        return;
    }
    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
          content: ''          
        });
    }
    edit(e){
        var idx = e.target.id;
        this.setState({
            openEdit:true,
            editIdx:idx
        })
    }
    commitEdit = (item) =>{
        var value = this.state.inputContent;
        var data = this.state.data;
        var idx = this.state.editIdx;
        data[idx].info = value;
        this.setState({
            data:data,
            openEdit:false,
            inputContent:''
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
            console.log('...');
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => function(){
                let that  = this;
                let jsonbody = {};
                jsonbody.username = username;
                jsonbody.imgStr = imageUrl;
                var url = IPaddress + 'service/uploadAvatar';
                let options={};
                options.method='POST';
                options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
                options.body = JSON.stringify(jsonbody);
                fetch(url, options)
                    .then(response=>response.text())
                    .then(responseJson=>{
                        console.log(responseJson);
                        let data = eval('(' + responseJson + ')');
                        if(data.result == "fail"){
                            alert('请上传正确的图片');
                        }
                        else{
                            that.setState({
                                imageUrl: imageUrl,
                                loading: false
                            })
                        }
                    }).catch(function(e){
                    console.log("Oops, error");
                })
            });
        }
      }
    renderAvatar(){
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const imageUrl = this.state.imageUrl;
        return(
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
    handleInputChange = (e) =>{
        let content = e.target.value;
        this.setState({
            inputContent: content
        })

    }
    renderUserSetting(){
        const getContent = (item) => {
            if(this.state.openEdit && (item.idx == this.state.editIdx)){
                return(<Input onChange={this.handleInputChange} onPressEnter={() => this.commitEdit(item)} value={this.state.inputContent}/>);
            }
            return(<div>{item.info}</div>);
        }
        const modifyButton = (item) => {
            if(this.state.openEdit && (this.state.editIdx == item.idx)){
                return(
                    <a id={item.idx} onClick={() => this.commitEdit(item)}>确定</a>
                )
            }
            else{
                return(
                    <a id={item.idx} onClick={this.edit}>修改</a>
                )
            }
        }
        const avatar = this.renderAvatar();
        return(   
            <div>
                {avatar}         
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item actions={
                    [ modifyButton(item) ]}>
                  <List.Item.Meta
                    title={item.title}
                  />
                {getContent(item)}
                </List.Item>
              )}
            />
            </div>
            );

    }
    changeMenuKey(e){
        console.log(e.key);
        this.setState({menuKey:e.key});
    }
    renderContent(){
        const UserSetting = this.renderUserSetting();
        var key = this.state.menuKey;
        console.log(key+"     "+(key==1))
        if(key == 1){
            return UserSetting;
        }
        else{
            return <div>后续功能正在开发中QAQ</div>;
        }
    }
    render() {
        if(sessionStorage.getItem('username') == null){
            return <Redirect to="/login"/>;
        }

        const collapsedIcon = (
            this.state.collapsed ? (
                <Icon onClick={this.toggle} type='double-right' />
            ) : (
                <Icon onClick={this.toggle} type='double-left' />
            )
        )
        const getContent = this.renderContent();
        return(
            <div>
                <NavBar />
                <div style={{height:'80%',width:'60%',display:'inline-block'}}>
                    <Layout style={{height:'100%'}}>
                        <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        >
                        <div className="logo" />
                        <Menu style={{height:'100%'}} theme="light" mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={this.changeMenuKey}>
                            <Icon type="user" />
                            <span>个人信息设置</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={this.changeMenuKey}>
                            <Icon type="frown-o"  />
                            <span>屏蔽设置</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.changeMenuKey}>
                            <Icon type="filter"/>
                            <span>其他设置</span>
                            </Menu.Item>
                            <Menu.Item>
                                {collapsedIcon}
                            </Menu.Item>
                        </Menu>
                        </Sider>
                        <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 560 }}>
                            {getContent}
                        </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        )
    }
}

export default UserSetting;