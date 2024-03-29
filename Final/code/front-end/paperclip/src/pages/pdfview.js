import React, {Component} from 'react';
import PDF from 'react-pdf-js';
import { Button, Popover, Affix, Row, Col, Card} from 'antd';
import { Spin,Tooltip } from 'antd';

import emitter from '.././util/events';
import 'antd/dist/antd.css';
import { IPaddress } from '../App'

let leftplace = []
let rightplace = []
class PDFView extends Component{
    constructor(props){
        super(props);
        this.changeMarkVisible = this.changeMarkVisible.bind(this);
        this.getPgLoc = this.getPgLoc.bind(this);
        this.renderPostilButton = this.renderPostilButton.bind(this);
        this.state = {
            isLoading:true,
            page:1,
            paperID:this.props.paperID,
            username:sessionStorage.getItem('username'),
            marked:[],
            blocklist:[],
            marked_note:[],
            markVisible:true,
            selectid:null,
            cacheData:[],
            detailShow: 'none',
            x: 0,
            y: 0
        }
        //console.log(this.props.paperID);
        this.getData(this.props.paperID,1)
    }
    loadCache = (paperID,pagination) =>{
        let that = this;
        // //prev page cache
        // if (pagination-1!=0&&that.state.cacheData[pagination-2]==undefined){
        //     let jsonbody = {};
        //     jsonbody.username = this.state.username;
        //     jsonbody.paperID = paperID;
        //     jsonbody.pagination = pagination-1;
        //     var url = IPaddress+'service/paperDetail';
        //     let options={};
        //     options.method='POST';
        //     options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        //     options.body = JSON.stringify(jsonbody);
        //     fetch(url, options)
        //     .then(response=>response.text())
        //     .then(responseJson=>{
        //         // console.log(responseJson);
        //         let data = eval('('+responseJson+')');
        //         console.log(data);
        //         that.state.cacheData[pagination-1]=data;
        //     }).catch(function(e){
        //         console.log("Oops, error");
        //     })
        // }
        //next page cache
        if (pagination+1!=that.state.pages&&that.state.cacheData[pagination]==undefined){
            let jsonbody = {};
            jsonbody.username = this.state.username;
            jsonbody.paperID = paperID;
            jsonbody.pagination = pagination+1;
            var url = IPaddress+'service/paperDetail';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                // console.log(responseJson);
                let data = eval('('+responseJson+')');
                console.log(data);
                that.state.cacheData[pagination]=data;
            }).catch(function(e){
                console.log("Oops, error");
            })
        }
    }
    getData = (paperID,pagination) =>{
        console.log("1page:"+pagination);
        let that  = this;
        if (that.state.cacheData[pagination-1]==undefined){
            let jsonbody = {};
            jsonbody.username = this.state.username;
            jsonbody.paperID = paperID;
            jsonbody.pagination = pagination;
            var url = IPaddress+'service/paperDetail';
            let options={};
            options.method='POST';
            options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
            options.body = JSON.stringify(jsonbody);
            console.log("2page:"+pagination);
            fetch(url, options)
            .then(response=>response.text())
            .then(responseJson=>{
                // console.log(responseJson);
                let data = eval('('+responseJson+')');
                console.log(data);
                that.setState({
                    //page state
                    paperID:paperID,
                    pages:data.pagenum,
                    b64str:data.b64str,
                    pageloc: null,
                    pagesize:[700,1000],
                    blocklist:data.blocklist,
                    selectid:[1],
                    selectRender:null,
                    marked:data.marked,
                    marked_note:[
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
                        // {nid:1,tag:'1',render:[]}
                    ],
                    isLoading: false
                },()=>{
                    console.log("len:",data.b64str.length)
                    that.state.cacheData[pagination-1]=data
                    that.getPgLoc();
                    that.loadCache(paperID,pagination);
                })
            }).catch(function(e){
                console.log("Oops, error");
            })
        }else{
            var data = that.state.cacheData[pagination-1]
            that.setState({
                pageloc:null,
                b64str:data.b64str,
                selectid:[1],
                selectRender:null,
                blocklist:data.blocklist,
                marked:data.marked,
                isLoading:false,
            },()=>{
                that.getPgLoc();
                that.loadCache(paperID,pagination)
            })
        }
    }

    getPgLoc(){
        var div = document.getElementById("paperDiv");
        var pgloc = [div.offsetLeft-document.documentElement.scrollLeft,div.offsetTop-document.documentElement.scrollTop];
        //console.log("newPgLoc:"+pgloc);
        this.setState({
            pageloc:pgloc
        },()=>{
            this.allocComm();
        });
    }
    componentDidMount() {
        this.Event = emitter.addListener('addMark', (data) => {
            let marked = this.state.marked;
            marked.push(data);
            this.setState({
                marked:marked
            },()=>{
                this.allocComm();
            })
        });
        this.Event1 = emitter.addListener('deleteMark', (posID) => {
            let marked = this.state.marked;
            for(var i=0;i<marked.length;i++){
                if(marked[i].posID == posID){
                    marked.splice(i,1);
                }
            }            
            this.setState({
                marked:marked
            },()=>{
                this.allocComm();
            })
        });

        this.Event2 = emitter.addListener('blocksForPostil', (data) => {
            if(data == "clear" && (this.state.selectid != null)){                
                this.putSelect(this.state.selectid);
                return;                
            }
            this.colorBlocks(data);
        });
    }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
        // while (this.state.pageloc==null){}
        // this.allocComm()
    }
    handlePrevious = () => {
        if (this.state.page==1) return
        let old = this.state.page
        this.setState({ 
            page: old - 1,
            isLoading:true,
            selectid:null,
            x: 0,
            y: 0,
            detailShow: 'none'
         })
        this.getData(this.state.paperID,old-1);
        emitter.emit('changePostils',[]);
    }
    handleNext = () => {
        if (this.state.page==this.state.pages) return
        let old = this.state.page
        this.setState({
            page: old + 1,
            isLoading:true,
            x: 0,
            y: 0,
            detailShow: 'none'
        });
        this.getData(this.state.paperID,old+1);
        emitter.emit('changePostils',[]);
    }
    refreshPostil = (selectid) => {
        let that  = this;
        let jsonbody = {};
        jsonbody.username = this.state.username;
        jsonbody.paperID = 1;
        jsonbody.pagination = 1;
        jsonbody.selectid = selectid;
        var url = IPaddress+'service/blockPostils';
        let options={};
        options.method='POST';
        options.headers={ 'Accept': 'application/json', 'Content-Type': 'application/json'};
        options.body = JSON.stringify(jsonbody);
        fetch(url, options)
        .then(response=>response.text())
        .then(responseJson=>{
            console.log(responseJson);
            let data = eval('('+responseJson+')');
            //console.log(data)
            emitter.emit("changePostils",data);
        }).catch(function(e){
            console.log("Oops, error");
        })
    }
    refreshMark = () => {

    }
    mouseDown = (e) => {
        console.log('mouse down')
        let loc = [e.clientX-e.target.getBoundingClientRect().left,e.clientY-e.target.getBoundingClientRect().top]
        let tid = this.findItemId(loc)
        this.setState({
            mousePressing:true,
            mouseStart:tid,
            detailShow: 'none',
            x: 0,
            y: 0
        })
        if (tid!=null){
            this.putSelect([tid])
        }else{
            this.putSelect([])
        }
    }
    mouseUp = (e) => {
        console.log('mouse up')
        this.setState({
            mousePressing:false,
        })
        
        /*
        console.log(e.target)
        console.log(e.target.height)
        console.log('screenX',e.screenX)
        console.log('clienty',e.clientY)
        console.log('objy',e.target.getBoundingClientRect().top)
        console.log('scroll top',document.documentElement.scrollTop)
        console.log('clienty-objx',e.clientX-e.target.getBoundingClientRect().left)
        console.log('clienty-objy',e.clientY-e.target.getBoundingClientRect().top)*/
        // alert(this.state.selectid)
        if (this.state.selectid.length!=0){
            this.setState({
                detailShow: 'block',
                x: e.clientX-e.target.getBoundingClientRect().left+15, 
                y: e.clientY-e.target.getBoundingClientRect().top+5,
            })
            emitter.emit("getBlockList",this.state.selectid);
            this.refreshPostil(this.state.selectid)
        }
        else{
            this.setState({
                detailShow: 'none',
                x: 0,
                y: 0
            })
            emitter.emit("getBlockList","empty");
        }
    }
    mouseMove = (e) => {
        var pgloc = [e.target.offsetLeft-document.documentElement.scrollLeft,e.target.offsetTop-document.documentElement.scrollTop]
        this.setState({
            pageloc:pgloc
        });
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
    }
    findItemId = (loc) => {
        if(this.state.blocklist == null)
            return null;
        for (var i=0;i<this.state.blocklist.length;i++){
            let obj = this.state.blocklist[i]
            if (obj.start[0]<=loc[0] && loc[0]<=obj.end[0] && obj.start[1]<=loc[1] && loc[1]<=obj.end[1]){
                return obj.id  
            }
        }
        return null
    }
    colorBlocks = (idlist) => {//显示一条批注对应的blocks
        this.getPgLoc();
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
                backgroundColor:'blue',
                position: 'absolute',
                left:item.start[0]+this.state.pageloc[0]+document.documentElement.scrollLeft,
                top:item.start[1]+this.state.pageloc[1]+document.documentElement.scrollTop,
                minHeight:h,
                minWidth:w,
                opacity:0.2,
                pointerEvents:'none'
            }
            res.push(
            <div key={i} width={w} height={h} style={stl}/>
            )
        }
        this.setState({
            blocksRender:res,
            selectRender:[]
        })
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
            if(item == null){
                return;
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
                opacity:0.3,
                pointerEvents:'none'
            }
            res.push(
            <div key={i} width={w} height={h} style={stl}/>
            )
        }
        this.setState({
            blocksRender:[],
            selectRender:res
        })
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
                // console.log(bh)
            }
        }
    }
    allocComm = () => {
        if(!this.state.markVisible){
            this.setState({commRender:[]});
            return;
        }
        leftplace = []
        rightplace = []
        let cr=[]
        if(this.state.marked == null)
            return null;
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
                    opacity:0.3,
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
                opacity: 0.3,
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
                opacity: 0.3,
            }
            rend.push(<div key={rend.length+1} width={40} height={3} style={line_stl2}/>)

            cr.push({cid:cr.length+1,tag:(cr.length+1).toString(),render:rend})
        }
        this.setState({commRender:cr})
        // console.log(rightplace)
        this.allocNote()
    }
    allocNote = () => {
        let cr=[]
        for (var i=0;i<this.state.marked_note.length;i++){
            let mitem = this.state.marked_note[i]
            let rend = []
            //add block div(Blue)
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

    changeMarkVisible(){
        var visible = this.state.markVisible;
        this.getPgLoc();
        this.setState({
            markVisible:!visible
        },()=>{
            console.log(this.state.marked);            
            this.allocComm();
        })
    }
    changePage(){
        return(
            <div style={{zIndex:"100", position:"fixed",bottom:"5%",right:"24%"}}>
                <Tooltip placement="right" title="上一页">
                    <Button onClick={this.handlePrevious} icon="up" />
                </Tooltip>
                <br/>
                <div>第{this.state.page}页</div>
                <Tooltip placement="right" title="下一页">
                <Button onClick={this.handleNext}  icon="down" />
                </Tooltip>
                <br/>
                <Tooltip placement="right" title={this.state.markVisible?"隐藏标记":"显示标记"} >
                <Button onClick={this.changeMarkVisible} shape="circle" 
                icon={this.state.markVisible?"eye":"eye-o"} 
                type={this.state.markVisible?"primary":"default"}
                style={{marginTop:"15%"}}/>
                </Tooltip>
            </div>
        );
    }
    renderPostilButton(){        
        const { x, y , detailShow } = this.state;
        console.log("detailShow:"+detailShow+"dx: "+x+"dy: "+y);
        return(
            <div style={{position:'absolute',top: y, left: x, display:detailShow}}>
            <Tooltip title="添加批注" placement="right">
                <Button shape="circle" type="primary" icon="plus" size="small"
                style={{boxShadow:"0px 1px 3px #BDBCBC"}}
                onClick={()=>{emitter.emit('addPostils',"ok")}}
                />
            </Tooltip>
            </div>
            );
    }
    render(){
        const changePage = this.changePage();
        const postilButton = this.renderPostilButton();
        return(
            this.state.isLoading
            ? <Spin size="large"/>
            : <div style={{backgroundColor:'white',width:"50%",
            position:"absolute",left:"23%"}}>
                    {changePage}
                    <div>
                        <div id="paperDiv"
                        onMouseDown={this.mouseDown} 
                        onMouseUp={this.mouseUp} 
                        onMouseMove={this.mouseMove}
                        style={{width:'700px'}}
                        >
                            <img id="pdf-canvas" src={this.state.b64str} width={700} style={{pointerEvents: 'none',userSelect:'none',mozUserSelect:'-moz-none'}}/>
                        </div>
                    </div>
                    
                    {this.state.selectRender}
                    {this.state.blocksRender}
                    {this.state.commRender.map((cr)=>(
                        <div>{cr.render}</div>
                    ))}
                    {this.state.noteRender.map((cr)=>(
                        <div>{cr.render}</div>
                    ))}
                    {postilButton}
            </div>          
    
        
        )
    }
}

export default PDFView;