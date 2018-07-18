import React, { Component } from 'react';
import { Divider ,Modal,Avatar,Checkbox,Icon,Button,Popover,Card} from 'antd';
import {Link } from 'react-router-dom';
import Postil from '.././components/postil';
import NavBar from '.././components/nav-bar';
import PDFView from './pdfview';
import NoteList from '.././components/notelist';
import Tool from '.././components/tool';
import emitter from '.././util/events';
import { IPaddress } from '../App'

class Paper extends Component{
    constructor(props){
        super(props);
        this.state={
            paperID:this.props.location.search.substring(9),//9 == 'paperID='.length+1,
            username:sessionStorage.getItem('username')
        }
        console.log("paperID:"+this.props.location.search.substring(9));
    }
        
    render() {
        return(
            <div style={{position:"relative"}}>
                <NavBar />
                <NoteList paperID={this.state.paperID}/>                
                <PDFView paperID={this.state.paperID}/>        
                <Postil />
                <br/>
                <Tool paperID={this.state.paperID}/>
            </div>
        )
    }
}

export default Paper;
