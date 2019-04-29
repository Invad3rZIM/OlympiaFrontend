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
    security : state.security
  };
}


let id = 0;
let set = new Set();


function overview(first, last, username, shift) {
    return {first, last, username, shift}
}

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

      //need to sort everything. will do that later.
      var listItems = events.map((d) => getData(d.Name, d.Arena, d.TicketCount, d.Arena.Capacity, d.PublicPrice, d.StaffPrice, d.Day, d.StartTime, d.Duration, d.CurrentSecurity, d.SecurityNeeded)) //this render needs to be completed


      listItems = listItems.filter((d) => {
        return !d.name.startsWIth("(S) - ")
      })

  var t = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Arena</TableCell>
            <TableCell align="right">Registration Count</TableCell>
            <TableCell align="right">Event Capacity</TableCell>

            <TableCell align="right">Current Security</TableCell>
            <TableCell align="right">Preferred Count</TableCell>

            <TableCell align="right">Get Security</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map(row =>
              (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">
             {row.arena}
            </TableCell>
              <TableCell align="center">{row.current}</TableCell>
              <TableCell align="center">{row.capacity}</TableCell>
              <TableCell align="center">{row.currentGuards}</TableCell>

            <TableCell align="center"><Input onChange={ this.handleNeededChange} name={row.name} placeholder={""+ row.needed}></Input></TableCell>
              <TableCell align="center"><Button onClick={(e) => this.updateGuards(row.name, row.needed, e)}>Update</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

  let guards = this.props.security.allSecurity.map((s) => overview(s.First, s.Last, s.Username, s.Shifts))

  var guardSchedules = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Username</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Shifts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guards.map(row =>
              (
            <TableRow key={row.username}>
           
           <TableCell align="center">{row.username}</TableCell>
            <TableCell align="center">{row.first}</TableCell>
            <TableCell align="center">{row.last}</TableCell>
            <TableCell align="center">{row.shift}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );

      return (
        <div>
            <p>This is a view of all the events currently in the roster!</p>
            { t}
            
            <br/>
            <br/>
            <br/>

            {guardSchedules}
        </div>
      );
  }
}



export default connect(mapStateToProps)(GruntPage)