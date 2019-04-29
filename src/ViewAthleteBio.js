import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import {redirect} from './actions/redirectActions';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { getAllArenas } from './actions/arenaActions';

import { getAllEvents, getMyEvents } from './actions/eventActions';
import { getAllSecurity } from './actions/securityActions';

function buildProfile() {
    return { name : "Kirk", sex : "Male", weight : 172, height : 603, Bio : "Bio"  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class ViewAthleteBio extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

  }


  createUser() {
    redirect("CREATE_USER")
  }

  render() {

    let profile = buildProfile()

    console.log(profile.weight)
    //var gender = ["Male", "Female"]
    //var genderOptions = gender.map((d) => (<MenuItem key={d}  value={d}>{d}</MenuItem>))

    return (
       
      <div>
           <p>This is a view of an athlete's Bio</p>
          <p>Name: </p>
          <p>Sex: </p>
          <p>Age: </p>
          <p>Height: </p>
          <p>Weight: </p>
          <p>Bio: </p>

    </div>
    );
  }
}

export default connect(mapStateToProps)(ViewAthleteBio)