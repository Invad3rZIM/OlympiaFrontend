import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";


function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect
  };
}

class Mux extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        switch(this.props.redirect.page ) {
            case "LOGIN": 
                return (
                    <div><Login/></div>
                );
                case "CREATE_USER": 
                return (
                    <div><CreateUser/></div>
                )
                case "DASHBOARD": 
                return (
                    <div><Dashboard/></div>
                )
        }

  }
}

export default connect(mapStateToProps)(Mux)