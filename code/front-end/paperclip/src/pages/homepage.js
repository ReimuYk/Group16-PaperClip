import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Input, Select, Carousel, List, Avatar } from 'antd';
import { Row, Col } from 'antd';
import NavBar from '../components/nav-bar';

const Search = Input.Search;
const Option = Select.Option;

class Home extends Component{
    constructor(props){
        super(props);       
        
    }
    
    
    render(){
       
        return(
            <div>
                <NavBar />
            </div>
        )
    }
}

export default Home;

