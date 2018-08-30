import React, {Component} from 'react';
import {  Layout, Icon,Upload, message,Button, Divider, Menu, List, Avatar, Modal, Input, Anchor } from 'antd';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/nav-bar.js';
import '../css/style.css';
import { IPaddress } from '../App'
/* fake data */

const { Header, Content, Sider } = Layout;
var username = '';

class UserSetting extends Component{
    constructor(props){
        super(props);
        this.edit = this.edit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
        this.changeMenuKey = this.changeMenuKey.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.compressImg = this.compressImg.bind(this);

        this.state = {
            collapsed: false,
            content:'',
            menuKey:1,
            openEdit:false,
            editIdx:null,
            loading: false,
            imageUrl:'',
            data:[
                {
                idx:0, title: '用户名',info:""
                },
                {
                idx:1, title: '个性签名',info:""
                }
            ],
            data1:[],
            inputContent:''
        }
    }
    componentWillMount(){
        if(sessionStorage.getItem('username') == null){
            window.location.href='/login';
            return;
        }
        username = sessionStorage.getItem('username');
        let that = this;
        /* get data according to username */
        let jsonbody = {};
        jsonbody.username = username;
        let url = IPaddress + 'service/hostInfo';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                let data = eval('(' + responseJson + ')');
                console.log('data', data);
                that.setState({
                    imageUrl: data.userheader,
                    data: data.userInfo,
                    data1: data.data1,
                })
                console.log('this.stat.data', that.state.data)
            }).catch(function(e){
            console.log("Oops, error");
        })
        return;
    }

    beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('只能上传jpg文件！', 3);
        }
        const isLt2M = file.size / 1024 / 1024 < 6;
        if (!isLt2M) {
          message.error('头像必须小于6M！', 3);
        }        
        this.uploadAvatar(file);
        return isJPG && isLt2M;
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
    submitCommit = () =>{
        let that = this;
        let jsonbody = {};
        jsonbody.username = username;
        jsonbody.password = this.state.data[3].info;
        jsonbody.description = this.state.data[2].info;
        var url = IPaddress + 'service/modify/userinfo';
        let options = {};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                console.log(responseJson);
                let data = eval('(' + responseJson + ')');
                if(data.resule != 'fail'){
                    message.success('修改成功！');
                }
            }).catch(function(e){
            console.log("Oops, error: ", e);
        })
    }

    compressImg=(size,path, obj, callback)=>{
        /*if(size/1024<100){//小于100k的不用压缩
            callback(path);
            return;
        }*/
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            console.log("w:"+w+" h:"+h);
            var quality = 0.7;  // 默认图片质量为0.7
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);            
        }
    }
    uploadAvatar(file){
        let that  = this;
        var size = file.size;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            var base64 = e.target.result;
            console.log("old "+base64.length);
            that.compressImg(size,base64,{width:250,height:250,quality:0.8},function(base64){
                console.log("new "+ base64.length);
                console.log(base64);
                let jsonbody = {};
                jsonbody.username = username;
                jsonbody.imgStr = base64;
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
                            message.error('请上传正确的图片', 3);
                            return;
                        }                
                        that.setState({
                            imageUrl: base64,
                            loading: false
                        })
                    }).catch(function(e){
                        console.log("Oops, error");
                    })
                });            
            }
    }
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
            console.log('...');
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
                action="#"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{width:"234px",height:"232px"}}/> : uploadButton}
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
            else if(item.idx == 3 || item.idx == 2){
                return(
                    <a id={item.idx} onClick={this.edit}>修改</a>
                )
            }
            else{
                return(
                    <a style={{color: 'grey'}}>不可修改</a>
                )
            }
        }
        const avatar = this.renderAvatar();
        return(   
            <div style={{textAlign:'center'}}>
                {avatar}    
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={item => (
                <List.Item  actions={[ modifyButton(item) ]}>
                  <List.Item.Meta
                    style={{textAlign:'center'}}
                    title={item.title}
                  />
                {getContent(item)}
                <a style={{width:"25%"}}></a>
                </List.Item>
              )}
            />
                <Button type="primary" onClick={this.submitCommit}>确认修改</Button>
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