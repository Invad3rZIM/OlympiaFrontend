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
import ViewAthleteBio from './ViewAthleteBio';

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


  render() {
    //this needs to be formalized into an actual navigation bar
    
    switch(this.props.user.usertype) {
        case "public" :
            var s = (
            <div>  
                <p>This is for public!</p>
                <PurchaseTickets></PurchaseTickets>
                <MyEvents></MyEvents>
                <ViewAthleteBio></ViewAthleteBio>
                </div>
            )
            break

            case "staff" : 
            var s = (
                <div>
                    <p> This is for staff</p>

                <PurchaseTickets></PurchaseTickets>
                <MyEvents></MyEvents>
                <ViewAthleteBio></ViewAthleteBio>
                </div>
            )
             break

            case "athlete" : 
            var s =(
                    <div>
                        <p> This is for athletes</p>

                        <p onClick={this.redirectCompetition}>Compete!</p>

                        <p onClick={this.redirectAutographs}>Autographs</p>

                        <p onClick={this.redirectSetBio}>Set Bio</p>

                        <p onClick={this.redirectAthleteTickets}>Buy Tickets</p>

                        <p onClick={this.redirectMyEvents}>My Events</p>
                        
                    </div>


            )

break
                case "admin" : 
                var s = (
                    <div>
                        <p> This is for admins</p>
                        <p onClick={this.redirectNewArena}>Create Arena</p>

                        <p onClick={this.redirectNewEvent}>Create Event</p>
                    </div>
                )
                break
                case "guard" : 
                var s = (
                    <div>
                        <p> This is for security</p>
                        <GruntPage></GruntPage>
                        <p>HELLO!</p>
                    </div>
                )
                break
                case "officer" : 
                var s = (
                    <div>
                        <p> This is for officers</p>
                        <OfficerPage></OfficerPage>
                
                    </div>
                )

                break;

      }

      return (
        <div>

<button type="submit" onClick={this.logout}>Logout</button>
            
        {s}
        
        </div>
      )
  }
}

export default connect(mapStateToProps)(Navigation)