import React, { Component } from 'react';
import { Divider ,Modal,Avatar,Checkbox,Icon,Button,Popover,Card} from 'antd';
import {Link } from 'react-router-dom';
import Postil from '.././components/postil';
import NavBar from '.././components/nav-bar';
import PDFView from './pdfview';
import NoteList from '.././components/notelist';
import Tool from '.././components/tool';
import emitter from '.././util/events';


class Paper extends Component{
    constructor(props){
        super(props);

    }
    componentDidMount() {
        this.starEvent = emitter.addListener('star', (message) => {
            alert("star!");
        });
    }
    componentWillUnmount() {
        emitter.removeListener(this.starEvent);
    }
    render() {
        return(
            <div style={{position:"relative"}}>
                <NavBar />
                <NoteList />                
                <PDFView />        
                <Postil />
                <br/>
                <Tool />
            </div>
        )
    }
}

export default Paper;
