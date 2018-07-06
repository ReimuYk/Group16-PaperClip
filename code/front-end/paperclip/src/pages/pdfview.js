import React, {Component} from 'react';
import PDF from 'react-pdf-js';
import { Button, Popover, Affix, Row, Col, Card} from 'antd'
import 'antd/dist/antd.css';


let leftplace = []
let rightplace = []
class PDFView extends Component{
    state = {
        //page state
        pageloc: null,
        pagesize:[700,1000],
        blocklist:[
            {id:1,start:[144,141],end:[324,158]},
            {id:2,start:[147,177],end:[240,193]},
            {id:3,start:[148,212],end:[279,229]},
            {id:4,start:[148,251],end:[197,265]},
            {id:5,start:[197,251],end:[222,265]},
            {id:6,start:[222,251],end:[322,265]},
            {id:7,start:[104,449],end:[594,679]}
        ],
        selectid:[1],
        selectRender:null,
        marked:[
            {id:[2],content:'this is id 2 block',visible:false},
            {id:[3],content:'this is id 3 block',visible:false},
            {id:[5],content:'拥挤的两个批注',visible:false},
            {id:[6],content:'拥挤的第二个批注',visible:false}
        ],
        marked_note:[
            {id:[4],title:'note4',content:'this is id 4 note addr',visible:false},
            {id:[5],title:'note5',content:'int stands integer',visible:false}
        ],
        sel_content:[
            {ids:[2],like:11,dislike:22,marked:false,content:'this is an unmarked',user:'user1',time:'2019.01.01'}
        ],
        //mouse state
        mousePressing: false,
        mouseStart: null,
        //comment state
        commRender:[
            {cid:1,tag:'1',render:[]}
        ],
        noteRender:[
            {nid:1,tag:'1',render:[]}
        ],
        leftplace:[],
        rightplace:[]
    };
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
        // while (this.state.pageloc==null){}
        // this.allocComm()
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
        let loc = [e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top]
        let tid = this.findItemId(loc)
        this.setState({
            mousePressing:true,
            mouseStart:tid
        })
        if (tid!=null){
            this.putSelect([tid])
        }else{
            this.putSelect([])
        }
        console.log(e.target)
        console.log(e.target.height)
        console.log('screenX',e.screenX)
        console.log('clienty',e.clientY)
        console.log('objy',e.target.getBoundingClientRect().top)
        console.log('scroll top',document.documentElement.scrollTop)
        console.log('clienty-objx',e.clientX-e.target.getBoundingClientRect().left)
        console.log('clienty-objy',e.clientY-e.target.getBoundingClientRect().top)
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
        var pgloc = [e.target.getBoundingClientRect().left,e.target.getBoundingClientRect().top]
        if (pgloc!=this.state.pageloc && this.state.pageloc!=null){
            this.allocComm()
        }
        this.setState({
            pageloc:pgloc
        })
        let loc = [e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top]        
        let tid = this.findItemId(loc)
        if (!this.state.mousePressing) return
        if (tid!=null){
            if (this.state.mouseStart==null){
                this.setState({mouseStart:tid})
                return
            }
            let selected = []
            let flag = false
            for (var i=0;i<this.state.blocklist.length;i++){
                if (this.state.blocklist[i].id==this.state.mouseStart){
                    flag = true
                }
                if (flag){
                    selected.push(this.state.blocklist[i].id)
                }
                if (this.state.blocklist[i].id==tid){
                    this.putSelect(selected)
                    break
                }
            }
        }
        console.log(loc)
    }
    findItemId = (loc) => {
        for (var i=0;i<this.state.blocklist.length;i++){
            let obj = this.state.blocklist[i]
            if (obj.start[0]<=loc[0] && loc[0]<=obj.end[0] && obj.start[1]<=loc[1] && loc[1]<=obj.end[1]){
                return obj.id  
            }
        }
        return null
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
                opacity:0.6,
                pointerEvents:'none'
            }
            res.push(
            <div key={i} width={w} height={h} style={stl}/>
            )
        }
        this.setState({selectRender:res})
    }
    getTop = (lr,h) => {
        if (lr=='l'){
            var ll=leftplace
            var bh = h//button height
            var count = 0
            while (true){
                count += 1
                if (count>100) return bh
                var flag = false
                if (ll.length==0){
                    flag = true
                }
                var less = null
                var more = null
                for (var i=0;i<ll.length;i++){
                    if (ll[i]<=bh && (less==null || less<ll[i])){
                        less = ll[i]
                    }
                    if (ll[i]>bh && (more==null || more>ll[i])){
                        more = ll[i]
                    }
                }
                if (!(less==null||bh-less>=30)){
                    bh = less+30
                }
                else if (!(more==null||more-bh>=30)){
                    bh = more+30
                }else{
                    flag = true
                }
                if (flag==true){
                    leftplace.push(bh)
                    return bh
                }
                console.log(bh)
            }
        }
        if (lr=='r'){
            var ll=rightplace
            var bh = h//button height
            var count = 0
            while (true){
                count += 1
                if (count>100) return bh
                var flag = false
                if (rightplace.length==0){
                    flag = true
                }
                var less = null
                var more = null
                for (var i=0;i<ll.length;i++){
                    if (ll[i]<=bh && (less==null || less<ll[i])){
                        less = ll[i]
                    }
                    if (ll[i]>bh && (more==null || more>ll[i])){
                        more = ll[i]
                    }
                }
                if (!(less==null||bh-less>=30)){
                    bh = less+30
                }
                else if (!(more==null||more-bh>=30)){
                    bh = more+30
                }else{
                    flag = true
                }
                if (flag==true){
                    rightplace.push(bh)
                    return bh
                }
                console.log(bh)
            }
        }
    }
    allocComm = () => {
        leftplace = []
        rightplace = []
        let cr=[]
        for (var i=0;i<this.state.marked.length;i++){
            let mitem = this.state.marked[i]
            let rend = []
            //add block div(Red)
            let bitem = null
            for (var j=0;j<mitem.id.length;j++){
                for (var k=0;k<this.state.blocklist.length;k++){
                    if (mitem.id[j]==this.state.blocklist[k].id){
                        bitem = this.state.blocklist[k]
                        break
                    }
                }
                var w = bitem.end[0]-bitem.start[0]
                var h = bitem.end[1]-bitem.start[1]
                var stl = {
                    backgroundColor:'red',
                    position: 'absolute',
                    left:bitem.start[0]+this.state.pageloc[0]+document.documentElement.scrollLeft,
                    top:bitem.start[1]+this.state.pageloc[1]+document.documentElement.scrollTop,
                    minHeight:h,
                    minWidth:w,
                    opacity:0.6,
                    pointerEvents: 'none'
                }
                rend.push(
                    <div key={rend.length+1} width={w} height={h} style={stl}/>
                )
            }
            //add line div
            var w = this.state.pagesize[0]-bitem.end[0]-71
            var line_stl = {
                position: 'absolute',
                left:bitem.end[0]+this.state.pageloc[0]+document.documentElement.scrollLeft,
                top:bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3,
                minWidth:w,
                minHeight:3,
                backgroundColor: 'red',
                opacity: 0.6,
            }
            rend.push(<div key={rend.length+1} width={w} height={3} style={line_stl}/>)
            var tt = this.getTop('r',bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3-73-15)
            var btn_stl = {
                position: 'absolute',
                left:this.state.pagesize[0]+this.state.pageloc[0]+document.documentElement.scrollLeft-73+73-33,
                top:tt,
            }
            rend.push(
                <div key={rend.length+1} style={btn_stl}>
                    <Popover placement="bottomLeft" content={<a>{mitem.content}</a>} trigger='click'>
                        <Button shape='circle'>{i+1}</Button>
                    </Popover>
                </div>
            )
            var lt = bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3
            var deg = Math.atan((tt+15-lt)/40)*180/3.14
            deg = Math.round(deg)
            var le = Math.sqrt(40*40+(lt-tt-15)*(lt-tt-15))
            le = Math.round(le)
            var line_stl2 = {
                transform:'rotate('+deg.toString()+'deg)',
                transformOrigin:'0 0',
                position: 'absolute',
                left:this.state.pagesize[0]+this.state.pageloc[0]+document.documentElement.scrollLeft-73,
                top:lt,
                minWidth:le,
                minHeight:3,
                backgroundColor: 'red',
                opacity: 0.6,
            }
            rend.push(<div key={rend.length+1} width={40} height={3} style={line_stl2}/>)

            cr.push({cid:cr.length+1,tag:(cr.length+1).toString(),render:rend})
        }
        this.setState({commRender:cr})
        console.log(rightplace)
        this.allocNote()
    }
    allocNote = () => {
        let cr=[]
        for (var i=0;i<this.state.marked_note.length;i++){
            let mitem = this.state.marked_note[i]
            let rend = []
            //add block div(Red)
            let bitem = null
            for (var j=0;j<mitem.id.length;j++){
                for (var k=0;k<this.state.blocklist.length;k++){
                    if (mitem.id[j]==this.state.blocklist[k].id){
                        bitem = this.state.blocklist[k]
                        break
                    }
                }
                var w = bitem.end[0]-bitem.start[0]
                var h = bitem.end[1]-bitem.start[1]
                var stl = {
                    backgroundColor:'blue',
                    position: 'absolute',
                    left:bitem.start[0]+this.state.pageloc[0]+document.documentElement.scrollLeft,
                    top:bitem.start[1]+this.state.pageloc[1]+document.documentElement.scrollTop,
                    minHeight:h,
                    minWidth:w,
                    opacity:0.4,
                    pointerEvents: 'none'
                }
                rend.push(
                    <div key={rend.length+1} width={w} height={h} style={stl}/>
                )
            }
            //add line div
            // var w = this.state.pagesize[0]-bitem.end[0]-71
            var w = bitem.start[0]-71
            var line_stl = {
                // transform:'rotate(-10deg)',
                // transformOrigin:'0 0',
                position: 'absolute',
                left:this.state.pageloc[0]+document.documentElement.scrollLeft+71,
                top:bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3,
                minWidth:w,
                minHeight:3,
                backgroundColor: 'blue',
                opacity: 0.4,
            }
            rend.push(<div key={rend.length+1} width={w} height={3} style={line_stl}/>)
            var tt = this.getTop('l',bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3-73-15)
            var btn_stl = {
                position: 'absolute',
                left:this.state.pageloc[0]+document.documentElement.scrollLeft+73-73,
                top:tt
            }
            rend.push(
                <div key={rend.length+1} style={btn_stl}>
                    <Popover placement="bottomRight" content={<Card title={mitem.title} bordered={false}><a>{mitem.content}</a></Card>} trigger='click'>
                        <Button shape='circle'>{i+1}</Button>
                    </Popover>
                </div>
            )
            var lt = bitem.end[1]+this.state.pageloc[1]+document.documentElement.scrollTop-3
            var deg = Math.atan((tt+15-lt)/41)*180/3.14
            deg = -Math.round(deg)
            var le = Math.sqrt(41*41+(lt-tt-15)*(lt-tt-15))
            le = Math.round(le)
            var line_stl2 = {
                transform:'rotate('+deg.toString()+'deg)',
                transformOrigin:'100% 100%',
                position: 'absolute',
                left:this.state.pageloc[0]+document.documentElement.scrollLeft+71-le,
                top:lt,
                minWidth:le,
                minHeight:3,
                backgroundColor: 'blue',
                opacity: 0.4,
            }
            rend.push(<div key={rend.length+1} width={40} height={3} style={line_stl2}/>)

            cr.push({nid:cr.length+1,tag:(cr.length+1).toString(),render:rend})
        }
        this.setState({noteRender:cr})
    }
    render(){
        return(
            <div style={{float:"left",backgroundColor:'white',width:"50%",marginLeft:"3%"}}>
                    <Button onClick={this.handlePrevious}>prev page</Button>
                    <Button onClick={this.handleNext}>next page</Button>
                    <Button onClick={this.allocComm}>展示批注&笔记</Button>
                    <div>
                    <div id="pdf-canvas" 
                    onMouseDown={this.mouseDown} 
                    onMouseUp={this.mouseUp} 
                    onMouseMove={this.mouseMove}
                    style={{width:'700px',float:"left"}}
                    // style={{float:'left'}}
                    >
                        {/* <PDF page={this.state.page}
                            file={require("./hw-2-4.pdf")}
                            onDocumentComplete={this.onDocumentComplete}
                            width={900}
                        /> */}
                        <img src={require("./page.jpg")} width={700} style={{pointerEvents: 'none',userSelect:'none',mozUserSelect:'-moz-none'}}/>
                    </div>
                    </div>
                    {this.state.selectRender}
                    {this.state.commRender.map((cr)=>(
                        <div>{cr.render}</div>
                    ))}
                    {this.state.noteRender.map((cr)=>(
                        <div>{cr.render}</div>
                    ))}
            </div>
        )
    }
}

export default PDFView;