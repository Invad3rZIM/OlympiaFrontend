import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';

function mapStateToProps(state) {
  return {
  };
}

class CreateUser extends Component {
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

    attemptLogin(this.state.username, this.state.password)
  
    event.preventDefault();
  }

  logout(event) {
    logout()
  }

  createUser() {
    redirect("DASHBOARD")
  }

  render() {
    return (
      <div>

      <input type="text" placeholder="first name" name="username" onChange ={this.handleChange}></input>

      <input type="text" placeholder="last name" name="username" onChange ={this.handleChange}></input>

      <input type="text" placeholder="username" name="username" onChange ={this.handleChange}></input>

      <input type="text" placeholder="password" name="username" onChange ={this.handleChange}></input>
      <input type="text" placeholder="confirm password password" name="username" onChange ={this.handleChange}></input>


      <button type="submit" onClick={this.createUser}>Create User</button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CreateUser)