import React, {Component} from 'react';
import AdminUser from '../components/adminUser'
import AdminPaper from '../components/adminPaper'
import adminPaper from '../components/adminPaper';

class Admin extends React.Component {
    render(){
        return (
            <div class="container">
                <div class="row clearfix">
                    <div class="col-md-12 column">
                        <div class="tabbable" id="tabs-714085">
                            <ul class="nav nav-tabs">
                                <li class="active" style={{height:40,width:200}}>
                                    <a href="#panel-472968" data-toggle="tab">管理用户</a>
                                </li>
                                <li  style={{height:40,width:200}}>
                                    <a href="#panel-616364" data-toggle="tab">管理论文</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="panel-472968">
                                    <AdminUser/>
                                </div>
                                <div class="tab-pane" id="panel-616364">
                                    <AdminPaper/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin;