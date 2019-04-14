import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, createUser, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';

function mapStateToProps(state) {
  return {
    errors: state.errors
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
    createUser(this.state.firstname, this.state.lastname, this.state.username, this.state.password, this.state.usertype)
   
  }

  render() {
    if (this.props.errors.error == "") {
      
    }else if (this.props.errors.error == "USER_TAKEN") {
      var e = (<p>Error! That username is already in use!</p>)
    }
    const s = (
      <div>
        {e}
      <input type="text" placeholder="first name" name="firstname" onChange ={this.handleChange}></input>

      <input type="text" placeholder="last name" name="lastname" onChange ={this.handleChange}></input>

      <input type="text" placeholder="username" name="username" onChange ={this.handleChange}></input>

      <input type="password" placeholder="password" name="password" onChange ={this.handleChange}></input>
      <input type="password" placeholder="confirm password password" name="confirm" onChange ={this.handleChange}></input>
      <input type="text" placeholder="usertype" name="usertype" onChange ={this.handleChange}></input>


      <button type="submit" onClick={this.createUser}>Create User</button>
      </div>
    )

    return s
  }
}

export default connect(mapStateToProps)(CreateUser)