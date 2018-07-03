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
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/findback' component={FindBack} />
              <Route path='/register' component={Register} />
              <Route path='/note' component={Note} />
              <Route path='/paper' component={Paper} />
              <Route path='/search/:data' component={Search} />
              <Route path='/user' component={User} />
            </Switch>
          </BrowserRouter>

      </div>
        );
    }
}

export default App;
