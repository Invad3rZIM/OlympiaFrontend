import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
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

  render() {
    console.log(this.props.user.userType)
    if(this.props.user.userType == "admin") {
      return (
        <div><p>hello {this.props.username}</p>
        <p>This is some next level admin shit!
          </p>
          <button onClick={this.logout}>Logout</button></div>
      );
    }
    if(this.props.user.userType == "public") {
      return (
        <div><p>fucking peasant!</p>

<button onClick={this.logout}>Logout</button></div>
      );
    }

    return (
      <div>
      <input type="text" placeholder="username" name="username" onChange ={this.handleChange}></input>
        <input type="text" placeholder="password" name="password" onChange={this.handleChange}></input>

        <button onClick={this.handleSubmit} >Login</button>
       
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)