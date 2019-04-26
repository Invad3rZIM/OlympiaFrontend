import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';
import Navigation from './Navigation';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container, 
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class Dashboard extends Component {
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
    redirect("LOGIN")
  }

  newUserForm() {
    
  }

  render() {

    return (
      <div>  <Navigation/>
          <p>Welcome to the dashboard!</p>

          <button type="submit" onClick={this.logout}>Logout</button>
            </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard)