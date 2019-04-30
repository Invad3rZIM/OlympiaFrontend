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
import Navigation from './Navigation.js';


function weekday(num) {
    switch(num % 7) {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}

function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena
  };
}


let id = 0;
let set = new Set();

function getData(name, arena, current, capacity, ticketPrice, staffPrice, day, start, duration) {
  id += 1;

  start = parseInt(start/60) * 100 + start%60
  duration = parseInt(duration / 60 ) * 100 + duration%60


  if(arena == null || arena.Name == "") {
    return { id, name, arena : "Select Arena", current, capacity, ticketPrice, staffPrice, day, start, duration, arenaLabel : "" + id };
  } else {
    return { id, name, arena : arena.Name, current, capacity, ticketPrice, staffPrice, duration, day, start, duration, arenaLabel : "" + id };
  }
 }


class MyEvents extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: '',
        data : []
      };

    this.durations = []
    this.startTimes = []
    this.days = []
    this.allEvents = []

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {

    

    this.setState({[event.target.name]: event.target.value});
  }



  handleSubmit(event) {

    event.preventDefault();
  }


  render() {
      var events = this.props.event.allEvents.map((d) => getData(d.Name, d.Arena, d.TicketCount, d.Arena.Capacity, d.PublicPrice, d.StaffPrice, d.Day, d.StartTime, d.Duration)) 
      var myEvents = this.props.event.myEvents
      var eventMap = []

      var keys = Object.keys(myEvents)

      keys.map((k) => console.log("X " + k))
      keys = keys.filter(function (k) {
        return myEvents[k] > 0
      });
      
      events.map((d) => eventMap[d.name] = d)

      console.log(eventMap)
      
      //need to sort everything. will do that later.
      var listItems = events

     

  var t = (
    <Paper>
      <Table>
        <TableHead >
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Arena</TableCell>
            <TableCell align="right">Day</TableCell>
            <TableCell align="right">Event Start</TableCell>
            <TableCell align="right">Event Duration</TableCell>
            <TableCell align="right">Tickets Bought</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map(k => (
            <TableRow key={k}>
              <TableCell component="th" scope="row">
                {k}
              </TableCell>
              <TableCell align="right">{eventMap[k].arena}     
            </TableCell>
           
            <TableCell align="right">{weekday(eventMap[k].day)}</TableCell>
            <TableCell align="right">{eventMap[k].start}</TableCell>
            <TableCell align="right">{eventMap[k].duration}</TableCell>
            <TableCell align="right">{myEvents[k]}</TableCell>
                 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

      return (
        <div>
            <p>This is a view of your current schedule</p>
        { t}
        </div>
      );
  }
}



export default connect(mapStateToProps)(MyEvents)