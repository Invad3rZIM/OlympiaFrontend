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
<<<<<<< Updated upstream

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
=======
import AthleteBio from './AthleteBio.js';
import GruntPage from './GruntPage.js';
import AthleteScheduler from './AthleteScheduler.js';
import Navbar from './Navbar.js';

import ViewAthleteBio from './ViewAthleteBio';
import NewArena from './NewArena';
>>>>>>> Stashed changes

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

  redirectNewArena() {
    redirect("CREATE_ARENA");
  }

<<<<<<< Updated upstream
=======

  redirectAthleteTickets() {
    redirect("ATHLETE_PURCHASE");
  }


  redirectSetBio() {
    redirect("SET_BIO");
  }


>>>>>>> Stashed changes
  redirectNewEvent() {

    getAllEvents()
    redirect("CREATE_EVENT");
  }


<<<<<<< Updated upstream
=======
  redirectAutographs() {
    redirect("SCHEDULE_SIGNING");
  }

  redirectCompetition() {
    redirect("ATHLETE_COMPETITION");
  }

  redirectViewBio() {
    redirect("VIEW_BIO")
  } 


>>>>>>> Stashed changes
  render() {
    //this needs to be formalized into an actual navigation bar
    var user_type = this.props.user.usertype
    switch(user_type) {
        case "public" :
            var s = (
            <div>  
              
                <p>This is for public!</p>
                <PurchaseTickets></PurchaseTickets>
                <MyEvents></MyEvents>
                </div>
            )
            break

            case "staff" : 
            var s = (
                <div>
                    <p> This is for staff</p>

                <PurchaseTickets></PurchaseTickets>
                <MyEvents></MyEvents>
                </div>
            )
             break

            case "athlete" : 
            this.redirectCompetition();
            var s =(
                    <div>
<<<<<<< Updated upstream
                        <p> This is for athletes</p>

                <PurchaseTickets></PurchaseTickets>
                    </div>
                )
=======
                    </div>
            )
>>>>>>> Stashed changes

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
                        <p> This is for security</p>
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

        <Navbar type={user_type}></Navbar>
        {s}
        <p> End of navigation </p><br/><br/>
        </div>
      )
  }
}

export default connect(mapStateToProps)(Navigation)