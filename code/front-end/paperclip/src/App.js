import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import { Switch, Route, Link } from 'react-router-dom'
import Home from './pages/homepage'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <BrowserRouter>
            <div>
            <ul>
            <li>
                <Link tag="div" class="tab-item" to="/index" >
                <span>首页</span>
                </Link>
            </li>
            <li>
                <Link tag="div" class="tab-item" to="/home" >
                <span>首页</span>
                </Link>
            </li>
            </ul>
            
            <Switch>
              <Route path='/home' component={Home}/>
              {/* <Route path='/index' component={index}/> */}
            </Switch>
            </div>
          </BrowserRouter>
          
          </div>
      </div>
    );
  }
}

export default App;
