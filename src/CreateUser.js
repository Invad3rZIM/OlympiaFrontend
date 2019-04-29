import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, createUser, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';

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
      <div className= "create-user-block">
        {e}
        <div className= "create-user-block__form">
        <p>Create user</p>
      <Input type="text" placeholder="first name" name="firstname" onChange ={this.handleChange}></Input>
      <br></br>
      <Input type="text" placeholder="last name" name="lastname" onChange ={this.handleChange}></Input>
      <br></br>
      <Input type="text" placeholder="username" name="username" onChange ={this.handleChange}></Input>
      <br></br>
      <Input type="password" placeholder="password" name="password" onChange ={this.handleChange}></Input>
      <br></br>
      <Input type="password" placeholder="confirm password" name="confirm" onChange ={this.handleChange}></Input>
      <br></br>
      <Input type="text" placeholder="usertype" name="usertype" onChange ={this.handleChange}></Input>

      <br></br> <br></br>
      <Button color="primary" variant="contained" onClick={this.createUser}>Create User</Button>
      </div>
      </div>
    )

    return s
  }
}

export default connect(mapStateToProps)(CreateUser)