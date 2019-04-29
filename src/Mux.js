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
<<<<<<< Updated upstream

=======
import AthleteSigningScheduler from './AthleteSigningScheduler';
import AthleteScheduler from './AthleteScheduler';
import PurchaseTickets from './PurchaseTickets.js';
import AthleteBio from './AthleteBio.js';
import MyEvents from './MyEvents.js';
import Navigation from './Navigation.js';
import ViewAthleteBio from './ViewAthleteBio';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                return (
                    <div><Dashboard/></div>
                )
=======
                    s =(      <div><Dashboard/></div>)
                break
                case "SCHEDULE_SIGNING": 
                
                    s =(     <div><AthleteSigningScheduler/></div>)
                    break
                case "ATHLETE_COMPETITION": 
             
                    s =(      <div><AthleteScheduler/><br/><AthleteSigningScheduler/></div>)
                    break
                case "SET_BIO": 
             
                    s =(   <div><AthleteBio/></div>)
                    break
                case "ATHLETE_PURCHASE": 
            
                    s =(   <div><PurchaseTickets/><br/><MyEvents></MyEvents></div>)
                    break
                case "MY_EVENTS": 
               
                s =(    <div><MyEvents/></div>)
                break
                case "VIEW_BIO":
                console.log("mux: " + "view bio")
                s =(    <div><ViewAthleteBio/></div>)
                break
        }

        if (this.props.redirect.page == "LOGIN" || this.props.redirect.page == "CREATE_USER") {
            return (<div>{s}</div>)
>>>>>>> Stashed changes
        }

  }
}

export default connect(mapStateToProps)(Mux)