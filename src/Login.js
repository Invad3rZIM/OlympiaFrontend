import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import {redirect} from './actions/redirectActions';

import Button from '@material-ui/core/Button';
import { getAllArenas } from './actions/arenaActions';

import { getAllEvents, getMyEvents } from './actions/eventActions';
import { getAllSecurity } from './actions/securityActions';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
    this.createUser = this.createUser.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    getAllArenas()
    getAllEvents()
    getAllSecurity()
<<<<<<< Updated upstream
    attemptLogin(this.state.username, this.state.password)
=======
    getAllAthletes()
    attemptLogin(this.state.username.toLowerCase(), this.state.password)
>>>>>>> Stashed changes
    
    event.preventDefault();
  }

  logout(event) {
    logout()
  }

  createUser() {
    redirect("CREATE_USER")
  }

  render() {
    return (
      <div>
        <form>
        <br/> <br/>
      <input type="text" placeholder="username" name="username" onChange ={this.handleChange}></input>
        <input type="password" placeholder="password" name="password" onChange={this.handleChange}></input>
<br/>
        <Button variant="contained" color="primary" onClick={this.handleSubmit} >Login</Button>
        <br/> <br/> <br/>
        <Button color="ff00ff" variant="contained" onClick={this.createUser} > New User? </Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)