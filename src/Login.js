import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import {redirect} from './actions/redirectActions';

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

    attemptLogin(this.state.username, this.state.password)

    redirect("DASHBOARD")
    
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
        <button onClick={this.handleSubmit} >Login</button>
        <br/> <br/> <br/>
        <button onClick={this.createUser} > New User? </button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)