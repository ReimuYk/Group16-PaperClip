import React, {Component} from 'react';
import {  Layout, Icon,Upload, message,Button, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from '../components/nav-bar.js';
import '../css/style.css';
import User from './userpage.js';
import url from '../statics/uh.jpg'

/* fake data */

const { Header, Content, Sider } = Layout;

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
            menuKey:null,
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
            ]
        }
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
    commitEdit(e){
        var value = e.target.value;
        var data = this.state.data;
        var idx = this.state.editIdx;
        data[idx].info = value;
        this.setState({
            data:data,
            openEdit:false,
        })
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl:imageUrl,
            loading: false,
        }));
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

    renderUserSetting(){
        const getContent = (item) => {
            if(this.state.openEdit && (item.idx == this.state.editIdx)){
                return(<Input onPressEnter={this.commitEdit} placeholder={this.state.data[item.idx].info}/>);
            }
            return(<div>{item.info}</div>);
        }
        const avatar = this.renderAvatar();
        return(   
            <div>
                {avatar}         
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item actions={[<a id={item.idx} onClick={this.edit}>edit</a>]}>
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
        this.setState({menuKey:e.key});
    }
    render() {
        const collapsedIcon = (
            this.state.collapsed ? (
                <Icon onClick={this.toggle} type='double-right' />
            ) : (
                <Icon onClick={this.toggle} type='double-left' />
            )
        )
        const UserSetting = this.renderUserSetting();
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
                            <Menu.Item key="2">
                            <Icon type="video-camera" onClick={this.changeMenuKey} />
                            <span>屏蔽设置</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                            <Icon type="upload" onClick={this.changeMenuKey}/>
                            <span>nav 3</span>
                            </Menu.Item>
                            <Menu.Item>
                                {collapsedIcon}
                            </Menu.Item>
                        </Menu>
                        </Sider>
                        <Layout>
                        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 560 }}>
                            {UserSetting}
                        </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        )
    }
}

export default UserSetting;