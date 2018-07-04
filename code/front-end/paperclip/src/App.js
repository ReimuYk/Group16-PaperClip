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
import FindBack from './pages/findbackpage';
import StarNote from './pages/starNotePage';
import StarPaper from './pages/starPaperPage';
import StarDoc from './pages/starDocPage';
import StarUser from './pages/StarUserPage';
import UserDoc from './pages/userDocPage';
import UserNote from './pages/userNotePage';
import UserFens from './pages/userFensPage';
import Register from './pages/RegisterPage'
import Discover from './pages/discoverPage'
import PDFView from './pages/pdfview'

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
              <Route exact path='/user' component={User} />
              <Route path='/user/starpaper' component={StarPaper} />
              <Route path='/user/starnote' component={StarNote} />
              <Route path='/user/stardoc' component={StarDoc} />
              <Route path='/user/staruser' component={StarUser} />
              <Route path='/user/userdoc' component={UserDoc} />
              <Route path='/user/usernote' component={UserNote} />
              <Route path='/user/userfens' component={UserFens} />
              <Route path='/user' component={User} />
              <Route path='/discover' component={Discover} />
              <Route path='/pdfview' component={PDFView} />
            </Switch>
          </BrowserRouter>

      </div>
        );
    }
}

export default App;
