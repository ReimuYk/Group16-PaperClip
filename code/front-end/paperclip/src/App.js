import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route, Link } from 'react-router-dom';


import './App.css';
import 'antd/dist/antd.css';

import Home from './pages/homepage';
import Login from './pages/loginpage';
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
import UserSetting from './pages/userSettingPage';
import ViewDoc from './pages/viewDocPage';
import Register from './pages/RegisterPage';
import Discover from './pages/discoverPage';
import ModifyDoc from './pages/modifyDoc';
import ModifyNote from './pages/modifyNote'
import PDFView from './pages/pdfview';
import AdminUserList from './components/adminUser';
import AdminPaperList from './components/adminPaper';
import Admin from './pages/adminPage';
import UserDocDetail from './pages/userDocDetailPage';
import Message from './pages/message';
import OtherUserPage from './pages/otherUserPage'

export var IPaddress = '192.168.1.128:8080/'

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
              <Route path='/user/setting' component={UserSetting} />
                <Route path='/user/modifyDoc' component={ModifyDoc} />
              <Route path='/user/modifyNote' component={ModifyNote} />
              <Route path='/user/docdetail' component={UserDocDetail} />
              <Route path='/user/message' component={Message} />
              <Route path='/viewdoc' component={ViewDoc} />
              <Route path='/user' component={User} /> 
              <Route path='/discover' component={Discover} />
              <Route path='/pdfview' component={PDFView} />
              <Route path='/admin' component={Admin} />
              <Route path='/viewpage' component={OtherUserPage} />
            </Switch>
          </BrowserRouter>

      </div>
        );
    }
}

export default App;
