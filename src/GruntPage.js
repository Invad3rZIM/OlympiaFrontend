import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {getAllEvents, eventPair, eventStaffPrice, eventPublicPrice, schedule} from './actions/eventActions'
import store from './store';
import { redirect } from './actions/redirectActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import { updateSecurity } from './actions/securityActions';


function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena,
    security : state.security,
    user: state.user
  };
}


let id = 0;
let set = new Set();

function getData(name, arena, current, capacity, ticketPrice, staffPrice, day, start, duration, currentGuards, needed) {
  id += 1;

  start = parseInt(start/60) * 100 + start%60
  duration = parseInt(duration / 60 ) * 100 + duration%60
 

  if(arena == null || arena.Name == "") {
    return { id, name, arena : "Select Arena", current, capacity, ticketPrice, staffPrice, day, start, duration, arenaLabel : "" + id, needed , currentGuards};
  } else {
    return { id, name, arena : arena.Name, current, capacity, ticketPrice, staffPrice, duration, day, start, duration, arenaLabel : "" + id, needed , currentGuards};
  }
 }


class GruntPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: '',
        data : []
      };

    this.needed = []

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleNeededChange = this.handleNeededChange.bind(this);
    this.updateGuards = this.updateGuards.bind(this);
  }

  handleChange(event) {

    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  
  handleNeededChange( event) {
      console.log(event.target.name)
      if (event.target.value != null)
        this.needed[event.target.name] = event.target.value
  }


  updateGuards(eventName,needed, event) {

        if(!(eventName in this.needed)) {
            updateSecurity(eventName, needed)
        } else
            updateSecurity(eventName, this.needed[eventName])
  }


  render() {
      var events = this.props.event.allEvents

      //filter for shifts matching the actual user
      events = events.filter((e) => {
        let guards = e.CurrentGuards

        for(var i = 0; i < guards.length; i++) {
            if(guards[i].Username == this.props.user.username) {
                return true
            }
        }
        return false
      })

      events = events.map(d =>getData(d.Name, d.Arena, d.TicketCount, d.Arena.Capacity, d.PublicPrice, d.StaffPrice, d.Day, d.StartTime, d.Duration)) //this render needs to be completed)

  var guardSchedules = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Shift ID</TableCell>
            <TableCell align="center">Event</TableCell>
            <TableCell align="center">Arena</TableCell>
            <TableCell align="center">Day</TableCell>
            <TableCell align="center">Start</TableCell>
            <TableCell align="center">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map(row =>
              (
            <TableRow key={row.id}>
           
           <TableCell align="center">{row.id}</TableCell>
           <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">{row.arena}</TableCell>
            <TableCell align="center">{row.day}</TableCell>
            <TableCell align="center">{row.start}</TableCell>
            <TableCell align="center">{row.duration}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

      return (
        <div>
            <p>Scheduled Shifts</p>      
           
            <br/>

            {guardSchedules}
        </div>
      );
  }
}



export default connect(mapStateToProps)(GruntPage)