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
import { formatMs } from '@material-ui/core/styles/transitions';
import { athleteToggleEvent } from './actions/athleteActions';
import Navigation from './Navigation.js'


function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena,
    athlete : state.athlete,
    user: state.user
  };
}

let username = ""

let id = 0;

function getScheduleButton(user, flag, eventName) {
  var text = ""
  var bColor = ""

  if (flag) {
    text = "Commit"
    flag = "on"
    bColor = "primary"
  }
  else {
    text = "Dropout"
    flag = "off"
    bColor = "secondary" // to do change button color
  }
  
 return ( <TableCell align="center"><Button color={bColor} onClick={(e) => athleteToggleEvent(username, flag, eventName) } >{text}</Button></TableCell>)
}
function getData(name, arena,  day, start, duration,  flag) {
  id += 1;

  start = parseInt(start/60) * 100 + start%60
  duration = parseInt(duration / 60 ) * 100 + duration%60

  if (arena == null ) {
    arena = "TBD"
  } else {
    arena = arena.Name
  }

  return { id, name, arena ,  day, start, duration,  flag};
 }


class AthleteScheduler extends Component {
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
      username = this.props.user.username
      var events = this.props.event.allEvents

      //filter for shifts matching the actual user
     /* events = events.filter((e) => {
        let guards = e.CurrentGuards

        for(var i = 0; i < guards.length; i++) {
            if(guards[i].Username == this.props.user.username) {
                return true
            }
        }
        return false
      })*/
      var s = this.props.athlete.allAthletes

      let bio = {}
  
      for(var i = 0; i < s.length; i++) {
        if (s[i].Username == this.props.user.username) {
          bio = s[i]
          break;
        }
      }

      var propValue;
for(var propName in bio) {
    propValue = bio[propName]

    if(propName == "EventsParticipating")
    break;
}


    //  for(var e in bio)
  //    console.log(bio['EventsParticipating'].Event)
  if (propValue == null) {
    propValue = []
  }

      events = events.map(d =>getData(d.Name, d.Arena, d.Day, d.StartTime, d.Duration, (propValue[d.Name] == null))) //this render needs to be completed)

      events = events.filter(d => {
        return !d.name.startsWith("(S) -")
      })
      
      const tableStyles = {
        width: '80%',  
        margin: 'auto',
        borderRadius: '15px',
        borderWidth: '5px',
        borderStyle: 'solid',
        bordercolor: 'rgb(58,85,174);',
      };

      const headerStyles = {
        backgroundColor: 'blue',
        color: 'white',
      };
      
      const rowStyles = {
        textColor: 'blue',
      };

      const paperStyles = {
        padding: '20px',
      };

      var eventTable = (
        <Paper style={paperStyles}>
          <Table id="fixed-table">
            <TableHead id="TableHeadRow">
              <TableRow id="TableHeadRow">
                <TableCell 
                 id="TableHeadCell"
                 align="center">Event</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Arena</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Day</TableCell>
                <TableCell id="TableHeadCell"
                align="center">Start</TableCell>
                <TableCell id="TableHeadCell"
                align="center">Duration</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Book</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          
            {events.map(row =>
                  (
                <TableRow key={row.id} color="#FAFAFA">
               
               <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.arena}</TableCell>

                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.start}</TableCell>
                <TableCell align="center">{row.duration}</TableCell>
                {getScheduleButton(username, row.flag, row.name)}
                
                </TableRow>
              ))}


            </TableBody>
          </Table>
        </Paper>
      );


      return (
        <div>
            <p id="TitleOverTable">Sign up to compete!</p>
            {eventTable}
        </div>
      );
  }
}



export default connect(mapStateToProps)(AthleteScheduler)