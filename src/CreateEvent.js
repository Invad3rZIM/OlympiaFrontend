import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptCreateEvent, getAllEvents} from './actions/eventActions'
import AllEvents from './AllEvents';
import store from './store';
import Navigation from './Navigation';

import { redirect } from './actions/redirectActions';

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    attemptCreateEvent(this.state.name, this.state.duration, this.state.outdoors, this.state.aquatic, this.state.track, this.state.field)
   
    event.preventDefault();
  }

  render() {
    if (this.props.errors.error == "") {
      
    }else if (this.props.errors.error == "USER_TAKEN") {
      var e = (<p>Error! That username is already in use!</p>)
    }
    const s = (<div>
      <AllEvents></AllEvents>
      <br/>
      <br/>
      <br/>
        <p>Create an event by specifying the information below!</p>
        <form>
        <input type="text" name="name" onChange={this.handleChange} placeholder="event name"></input>
        <input type="number" name="duration"  onChange={this.handleChange}  placeholder="event duration"></input>
        <p>IS OUTDOORS?</p> <input type="checkbox" name="outdoors"  onChange={this.handleChange}  placeholder="Is Outdoors?"></input>
        <p>IS AQUATIC?</p> <input type="checkbox" name="aquatic"  onChange={this.handleChange}  placeholder="Is Aquatic?"></input>
        <p>HAS TRACK?</p>  <input type="checkbox" name="track"  onChange={this.handleChange}  placeholder="Has Track?"></input>
        <p>HAS FIELD?</p>  <input type="checkbox" name="field"  onChange={this.handleChange}  placeholder="Has Field?"></input> 
        <button type="submit" name="submit"  onClick={this.handleSubmit}  placeholder="Create Event!">Create Event</button>
    </form>
    </div>
    )

    return s
  }
}

export default connect(mapStateToProps)(CreateEvent)