import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import Login from "./Login";
import CreateUser from "./CreateUser";
import Dashboard from "./Dashboard";
import NewArena from "./NewArena";
import CreateEvent from "./CreateEvent";
import AthleteSigningScheduler from './AthleteSigningScheduler';
import AthleteScheduler from './AthleteScheduler';
import PurchaseTickets from './PurchaseTickets.js';
import AthleteBio from './AthleteBio.js';
import MyEvents from './MyEvents.js';

function mapStateToProps(state) {
  return {
    user: state.user,
    redirect: state.redirect
  };
}

class Mux extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        switch(this.props.redirect.page ) {
            case "LOGIN": 
                return (
                    <div><Login/></div>
                );
                case "CREATE_USER": 
                return (
                    <div><CreateUser/></div>
                )
                case "CREATE_ARENA": 
                return (
                    <div><NewArena/></div>
                )
                case "CREATE_EVENT": 
                return (
                    <div><CreateEvent/></div>
                )
                case "DASHBOARD": 
                return (
                    <div><Dashboard/></div>
                )
                case "SCHEDULE_SIGNING": 
                return (
                    <div><AthleteSigningScheduler/></div>
                )
                case "ATHLETE_COMPETITION": 
                return (
                    <div><AthleteScheduler/></div>
                )
                case "SET_BIO": 
                return (
                    <div><AthleteBio/></div>
                )
                case "ATHLETE_PURCHASE": 
                return (
                    <div><PurchaseTickets/></div>
                )
                case "MY_EVENTS": 
                return (
                    <div><MyEvents/></div>
                )
        }

  }
}

export default connect(mapStateToProps)(Mux)