import React, { Component } from 'react';
import { Collapse ,List,Input,Icon,Button,Avatar,Divider,Anchor} from 'antd';
const Panel = Collapse.Panel;
const Search = Input.Search;
const ButtonGroup = Button.Group;

class NoteList extends Component{  
    constructor(props){
        super(props);

        this.handleSearch = this.handleSearch.bind(this);

        this.state = {
            inputValue:"",
        }

    }
    changeInputValue(e){
        this.setState({inputValue:e.target.value});
    }
    handleSearch(value){

    }

    render() {
        return(
            <div id="postil" style={{width:"20%",float:"left", marginLeft:"2%",marginTop:"0"}}>
                <Anchor  offsetTop={60}>
                    <Search
                    type="textarea"
                    placeholder="input text"
                    enterButton={<Icon type="search" />}
                    size="default"
                    value={this.state.inputValue}
                    onChange={this.changeInputValue}
                    onSearch={this.handleSearch}
                    />   
                </Anchor>
                
                             
          </div>
        );
    }
}

export default NoteList;