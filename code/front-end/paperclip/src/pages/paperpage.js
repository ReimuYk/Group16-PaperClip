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
        console.log("paperID:"+this.props.paperID);
    }
    componentWillMount(){
        
    }
    componentDidMount() {
        this.starEvent = emitter.addListener('star', (ifStar) => {
            if(ifStar){
                this.starPaper();
            }
            else{
                this.quitStarPaper();
            }
            
        });
    }
    componentWillUnmount() {
        //console.log((this.starEvent));
        //emitter.removeListener("star",this.starEvent);
    }
    starPaper(){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = 'http://localhost:8080/service/starThePaper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    quitStarPaper(){
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = this.state.paperID;
        var url = 'http://localhost:8080/service/quitStar/paper';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            console.log(data)
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    render() {
        return(
            <div style={{position:"relative"}}>
                <NavBar />
                <NoteList />                
                <PDFView paperID={this.state.paperID}/>        
                <Postil />
                <br/>
                <Tool />
            </div>
        )
    }
}

export default Paper;
