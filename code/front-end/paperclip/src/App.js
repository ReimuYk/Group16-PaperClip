import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import Home from './pages/homepage';
import Login from './pages/loginpage';
import Note from './pages/notepage';
import Paper from './pages/paperpage';
import Search from './pages/searchpage';
import User from './pages/userpage';
import Register from './pages/RegisterPage'
import FindBack from './pages/findbackpage'
class App extends Component {
    render() {
        return (
            <div className="App">
                {/*<header className="App-header">
                 <img src={logo} className="App-logo" alt="logo" />
                 <h1 className="App-title">Welcome to React</h1>
                 </header>
                 <div>
                 <BrowserRouter>
                 <div>
                 <ul>
                 <li>
                 <Link to="/home" >
                 <span>首页</span>
                 </Link>
                 </li>
                 <li>
                 <Link to="/login" >
                 <span>登录</span>
                 </Link>
                 </li>
                 <li>
                 <Link to="/note" >
                 <span>笔记</span>
                 </Link>
                 </li>
                 <li>
                 <Link to="/paper" >
                 <span>论文</span>
                 </Link>
                 </li>
                 <li>
                 <Link to="/search" >
                 <span>搜索</span>
                 </Link>
                 </li>
                 <li>
                 <Link to="/user" >
                 <span>我的</span>
                 </Link>
                 </li>
                 </ul>*/}
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/home' component={Home} />
                            <Route path='/login' component={Login} />
                            <Route path='/note' component={Note} />
                            <Route path='/paper' component={Paper} />
                            <Route path='/search' component={Search} />
                            <Route path='/user' component={User} />
                            <Route path='/register' component={Register} />
                            <Route path='/findback' component={FindBack} />
                        </Switch>
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;
