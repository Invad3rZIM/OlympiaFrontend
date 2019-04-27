import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import {redirect} from './actions/redirectActions';

import Button from '@material-ui/core/Button';
import { getAllArenas } from './actions/arenaActions';

import { getAllEvents } from './actions/eventActions';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class Logout extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={logout()} >Logout</Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Logout)