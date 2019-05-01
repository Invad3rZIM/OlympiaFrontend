import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, createUser, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';
import { Button, FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { setOption } from './actions/internalActions';

function mapStateToProps(state) {
  return {
    errors: state.errors,
    internal : state.internal
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
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSelectChange(event) {
    setOption("SELECT_CREATE_USER", event.target.value)

    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    attemptLogin(this.state.username.toLowerCase(), this.state.password)
  
    event.preventDefault();
  }

  logout(event) {
    logout()
  }

  createUser() {
    console.log(this.state.password+  ": " + this.state.confirm)
    if (this.state.password != this.state.confirm) {
      store.dispatch({type:"DIFFERENT_PASSWORDS", payload:{}})
    } else {
      createUser(this.state.firstname, this.state.lastname, this.state.username.toLowerCase(), this.state.password, this.state.usertype)
    }
  }

  render() {
    let option = this.props.internal.createAccountOptions

    if (option == null ) {
      option = "Type"
    }

    if (this.props.errors.error == "") {

      
    }else if (this.props.errors.error == "USER_TAKEN") {
      var e = (<p class="error-text">Error! That username is already in use!</p>)
    } else if (this.props.errors.error == "DIFFERENT_PASSWORDS") {
      var e = (<p class="error-text">Error! passwords do not match</p>)
    }
    const s = (
      <div className= "create-user-block">
        {e}
        <div className= "create-user-block__form">
        <strong><p class="center-text ">Create user</p></strong>
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
      <p>Account Type: <br></br>
        <FormControl>
      <Select
      onChange={ this.handleSelectChange}
      name="usertype"
      placeholder="usertype"
      value={option}>
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="athlete">Athlete</MenuItem>
          <MenuItem value="officer">Officer</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
          <MenuItem value="guard">Guard</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>  
      </p>
      <br></br> <br></br>
      <Button color="secondary" variant="contained" onClick={this.createUser}>Create User</Button>
      </div>
      </div>
    )

    return s
  }
}

export default connect(mapStateToProps)(CreateUser)