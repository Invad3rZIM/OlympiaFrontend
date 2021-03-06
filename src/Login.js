import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import {redirect} from './actions/redirectActions';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles} from '@material-ui/core/styles';
import { getAllArenas } from './actions/arenaActions';

import { getAllEvents, getMyEvents } from './actions/eventActions';
import { getAllSecurity } from './actions/securityActions';
import { getAllAthletes } from './actions/athleteActions';



function mapStateToProps(state) {
  return {
    user: state.user,
    errors: state.errors,
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
    store.dispatch({type: "CLEAR", payload:{}})
    if (this.state.username.length > 0 && this.state.password.length > 0) {

      console.log("attempt login")
      console.log("RFM These are errors, " + this.props.errors.error)
    getAllArenas()
    getAllEvents()
    getAllSecurity()
    getAllAthletes()
    attemptLogin(this.state.username.toLowerCase(), this.state.password)
    
    event.preventDefault();
    }
  }

  logout(event) {
    logout()
  }

  createUser() {
    redirect("CREATE_USER")
  }
  
  render() {

    if (this.props.errors.error == "") {

      
    }else if (this.props.errors.error == "INVALID_LOGIN") {
      var e = (<p class="error-text">Error! Invalid Login</p>)
    }

    return (

      <div className="login-block">
      {e}
        <form className = "login-block__form">
        <br/> <br/>
        <strong><p class="center-text">Login</p></strong>
      <Input type="text" placeholder="username"  name="username" onChange ={this.handleChange}></Input>
      <br></br>  
      <Input type="password" placeholder="password" name="password" onChange={this.handleChange}></Input>
<br/><br></br>
        <Button  variant="contained" color="primary" onClick={this.handleSubmit} >Login</Button>
        <br/> <br/> <br/>
        <Button color="secondary" variant="contained" onClick={this.createUser} > New User? </Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Login)