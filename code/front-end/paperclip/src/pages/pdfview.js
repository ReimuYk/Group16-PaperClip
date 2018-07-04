import React, {Component} from 'react';
import PDF from 'react-pdf-js';
import PDFJS from 'pdfjs-dist'
import {Page} from 'react-pdf'
import { Document } from 'react-pdf';
import {Button} from 'antd'
import 'antd/dist/antd.css';


class pdfview extends Component{
    state = {
        //page state
        pageloc: null,
        pagesize:[1262,892],
        blocklist:[
            {id:1,start:[130,271],end:[383,295]},
            {id:2,start:[131,366],end:[385,388]},
            {id:3,start:[128,485],end:[384,507]}
        ],
        selectid:[1],
        selectRender:null,
        marked:[
            {id:[1],content:'this is id 1 block'}
        ],
        sel_content:[
            {ids:[2],like:11,dislike:22,marked:false,content:'this is an unmarked',user:'user1',time:'2019.01.01'}
        ],
        //mouse state
        mousePressing: false,
        mouseStart: null,
    };
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
    }
    handlePrevious = () => {
        if (this.state.page==1) return
        this.setState({ page: this.state.page - 1 });
    }
    handleNext = () => {
        if (this.state.page==this.state.pages) return
        this.setState({ page: this.state.page + 1 });
    }
    mouseDown = (e) => {
        console.log('mouse down')
        this.setState({
            mousePressing:true,
            mouseStart:(e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top)
        })
        console.log(e.target)
        console.log(e.target.height)
        console.log('screenX',e.screenX)
        console.log('clienty',e.clientY)
        console.log('objy',e.target.getBoundingClientRect().top)
        console.log('scroll top',document.documentElement.scrollTop)
        console.log('clienty-objx',e.clientX-e.target.getBoundingClientRect().left)
        console.log('clienty-objy',e.clientY-e.target.getBoundingClientRect().top)
        // let ctx = e.target.getContext('2d')
        // let img = new Image()
        // var data = ctx.getImageData(0,0,e.target.width,e.target.height)
        // img.src = e.target.toDataURL('image/png')
        // console.log(img.src)
        // e.target.width=700
        // console.log(data)
        // e.target.getContext('2d').drawImage(img,0,0,700,1000)
    }
    mouseUp = (e) => {
        console.log('mouse up')
        this.setState({mousePressing:false})
        console.log(e.target)
        console.log(e.target.height)
        console.log('screenX',e.screenX)
        console.log('clienty',e.clientY)
        console.log('objy',e.target.getBoundingClientRect().top)
        console.log('scroll top',document.documentElement.scrollTop)
        console.log('clienty-objx',e.clientX-e.target.getBoundingClientRect().left)
        console.log('clienty-objy',e.clientY-e.target.getBoundingClientRect().top)
    }
    mouseMove = (e) => {
        this.setState({
            pageloc:[e.target.getBoundingClientRect().left,e.target.getBoundingClientRect().top]
        })
        let loc = [e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top]        
        for (var i=0;i<this.state.blocklist.length;i++){
            let obj = this.state.blocklist[i]
            if (obj.start[0]<=loc[0] && loc[0]<=obj.end[0] && obj.start[1]<=loc[1] && loc[1]<=obj.end[1]){
                this.putSelect([obj.id])
                break
            }else{
                this.putSelect([])
            }
        }
        // console.log(this.state.selectid)
        if (!this.state.mousePressing) return
        console.log(loc)
    }
    putSelect = (idlist) => {
        this.setState({selectid:idlist})
        var res=[]
        for (var i=0;i<idlist.length;i++){
            var item = null
            for (var j=0;j<this.state.blocklist.length;j++){
                if (idlist[i]==this.state.blocklist[j].id){
                    item = this.state.blocklist[j]
                    break;
                }
            }
            var w = item.end[0]-item.start[0]
            var h = item.end[1]-item.start[1]
            var stl = {
                backgroundColor:'orange',
                position: 'absolute',
                left:item.start[0]+this.state.pageloc[0]+document.documentElement.scrollLeft,
                top:item.start[1]+this.state.pageloc[1]+document.documentElement.scrollTop,
                minHeight:h,
                minWidth:w,
                opacity:0.6
            }
            res.push(
            <div key={i} width={w} height={h} style={stl}/>
            )
        }
        this.setState({selectRender:res})
    }
    render(){
        // const { pageNumber, numPages } = this.state;
        // this.showPdf()
        
        return(
            <div sytle={{margin:'auto',background:'gray'}}>
                <Button onClick={this.handlePrevious}>prev page</Button>
                <Button onClick={this.handleNext}>next page</Button>
                {/* <Document
                file={require("./hw-2-4.pdf")}
                onLoadSuccess={this.onDocumentLoad}
                >
                <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p> */}
                <div id="pdf-canvas" 
                onMouseDown={this.mouseDown} 
                onMouseUp={this.mouseUp} 
                onMouseMove={this.mouseMove}>
                    <PDF page={this.state.page}
                        file={require("./hw-2-4.pdf")}
                        onDocumentComplete={this.onDocumentComplete}
                        width={900}
                    />
                </div>
                {this.state.selectRender}
            </div>
        )
    }

    // showPdf = () => {
    //     var container = document.getElementById("container");
    //     container.style.display = "block";
    //     var url = 'Scripts/jQuery经典入门教程(绝对详细).pdf';
    //     url = ''
    //     PDFJS.workerSrc = 'Scripts/pdf.worker.js';
    //     PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    //         pdf.getPage(1).then(function getPageHelloWorld(page) {
    //             var scale = 1;
    //             var viewport = page.getViewport(scale);
    //             var canvas = document.getElementById('the-canvas');
    //             var context = canvas.getContext('2d');
    //             canvas.height = viewport.height;
    //             canvas.width = viewport.width;
    //             var renderContext = {
    //                 canvasContext: context,
    //                 viewport: viewport
    //             };
    //             page.render(renderContext);
    //         });
    //     });
    // }
}

export default pdfview;