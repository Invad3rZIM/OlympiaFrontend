import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import store from './store';
import { redirect } from './actions/redirectActions';

import { getAllEvents } from './actions/eventActions';
import PurchaseTickets from './PurchaseTickets.js';
import MyEvents from './MyEvents.js';
import OfficerPage from './OfficerPage.js';
import AthleteBio from './AthleteBio.js';
import GruntPage from './GruntPage.js';
import AthleteScheduler from './AthleteScheduler.js';
import Navbar from './Navbar.js';
import ViewEventData from './ViewEventData.js'

import ViewAthleteBio from './ViewAthleteBio';
import NewArena from './NewArena';
import ViewAthleteData from './ViewAthleteData.js';

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectNewArena = this.redirectNewArena.bind(this);
    this.redirectNewEvent = this.redirectNewEvent.bind(this);
    this.redirectAutographs = this.redirectAutographs.bind(this);
    this.redirectCompetition = this.redirectCompetition.bind(this);
    this.redirectSetBio = this.redirectSetBio.bind(this);
    this.redirectAthleteTickets = this.redirectAthleteTickets.bind(this);
    this.redirectMyEvents = this.redirectMyEvents.bind(this)
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    redirect("LOGIN")
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    attemptLogin(this.state.username, this.state.password)
    
    event.preventDefault();
  }

  redirectMyEvents() {
    redirect("MY_EVENTS")
  }
  redirectNewArena() {
    redirect("CREATE_ARENA");
  }


  redirectAthleteTickets() {
    redirect("ATHLETE_PURCHASE");
  }


  redirectSetBio() {
    redirect("SET_BIO");
  }


  redirectNewEvent() {

    getAllEvents()
    redirect("CREATE_EVENT");
  }


  redirectAutographs() {
    redirect("SCHEDULE_SIGNING");
  }

  redirectCompetition() {
    redirect("ATHLETE_COMPETITION");
  }

  redirectViewBio() {
    redirect("VIEW_BIO")
  } 


  render() {
    //this needs to be formalized into an actual navigation bar
    var user_type = this.props.user.usertype
    switch(user_type) {
        case "public" :
            var s = (
            <div>  
                </div>
            )
            break

            case "staff" : 
            var s = (
                <div>
                </div>
            )
             break

            case "athlete" : 
            this.redirectCompetition();
            var s =(
                    <div>
                    </div>
            )

break
                case "admin" : 
                this.redirectNewArena();
                var s = (
                    <div>
                    </div>
                )
                break
                case "guard" : 
                var s = (
                    <div>
                        <GruntPage></GruntPage>
                    </div>
                )
                break
                case "officer" : 
                var s = (
                    <div>
                        <OfficerPage></OfficerPage>
                
                    </div>
                )

                break;

      }

      return (
        <div>

        <Navbar type={user_type}></Navbar>
        {s}
        
        </div>
      )
  }
}

export default connect(mapStateToProps)(Navigation)