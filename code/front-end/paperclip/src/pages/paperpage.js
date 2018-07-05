import React, { Component } from 'react';
import {Divider} from 'antd';
import Postil from '.././components/postil';
import NavBar from '.././components/nav-bar';
import PDFView from './pdfview';
import NoteList from '.././components/notelist';


class Paper extends Component{
    render() {
        return(
            <div>
                <NavBar />
                <NoteList />
                <PDFView />
                <Postil />
            </div>
        )
    }
}

export default Paper;
