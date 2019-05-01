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
import {setOption} from './actions/internalActions.js'
import Button from '@material-ui/core/Button';

import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import { updateSecurity } from './actions/securityActions';
import { formatMs } from '@material-ui/core/styles/transitions';
import { athleteToggleEvent, athleteScheduleSigning, athleteSigningDrop } from './actions/athleteActions';
import Navigation from './Navigation.js';


function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena,
    athlete : state.athlete,
    user: state.user,
    internal : state.internal
  };
}

let a = 0;
let b = 0;
let c = 0;
let user = ""
function updateDay(e) {
      a = e.target.value;

}

function updateStart(e) {
    b = e.target.value;

    b = parseInt(b/100) * 60 + b%100
}

function dropSigning(e, u) {
    athleteSigningDrop(username, u)
}

function updateDuration(e) {
    c = e.target.value;

    c = parseInt(c/100) * 60 + c%100
}

function tryNewSigning() {
    
 athleteScheduleSigning(arena, username, a, b, c)   
}

let username = ""
let arena = "Venue"
let id = 0;

function getScheduleButton(user, flag, eventName) {
  var text = ""

  if (flag) {
    text = "Commit"
    flag = "on"
  }
  else {
    text = "Dropout"
    flag = "off"
  }
  
 return ( <TableCell align="center"><Button onClick={(e) => athleteToggleEvent(username, flag, eventName) } >{text}</Button></TableCell>)
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


class AthleteSigningScheduler extends Component {
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
      var arenas = this.props.arena.allArenas
      var arenaOptions = arenas.map((d) => (<MenuItem key={d.Name}  value={d.Name}>{d.Name}</MenuItem>))
      var s = this.props.athlete.allAthletes

      arena = this.props.internal.selectArena
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

  if (propValue == null) {
    propValue = []
  }

      events = events.map(d =>getData(d.Name, d.Arena, d.Day, d.StartTime, d.Duration, (propValue[d.Name] == null))) //this render needs to be completed)

      events = events.filter(d => {
        return (d.name.includes(this.props.user.firstname) && d.name.includes(this.props.user.lastname))
      })

      let tableStyle = {
          
      }

      const paperStyles = {
        padding: '20px',
      };

      var eventTable = (
        <Paper style={paperStyles}>
          <Table>
            <TableHead>

            <TableRow id="TableHeadRow">
                <TableCell 
                id="TableHeadCell"
                align="center">Signing</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Arena</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Day</TableCell>
                <TableCell id="TableHeadCell"
                align="center">Start</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Duration</TableCell>
                <TableCell 
                id="TableHeadCell"
                align="center">Create</TableCell>
              </TableRow>

            <TableRow>
                <TableCell align="center">Create</TableCell><TableCell align="right">
              <Select

            value={arena}
            onChange={e => {
              
              arena = e.target.value
              setOption("SELECT_ARENA", arena)

        }    
    }
            input={<Input name={"arena"} id="arena-helper" />}
          >
          {arenaOptions}
          </Select>
            
            </TableCell>
                <TableCell align="center"><Input type="number" onChange={e => updateDay(e)} placeholder="Day"></Input></TableCell>
                <TableCell align="center"><Input type="number" onChange = {e => updateStart(e)}  placeholder="Start Time"></Input></TableCell>
                <TableCell align="center"><Input type="number"onChange = {e => updateDuration(e)} placeholder="Duration"></Input></TableCell>
                <TableCell align="center"><Button onClick={e => tryNewSigning(e)}>Create Autograph Session</Button></TableCell>
              </TableRow>
              
            </TableHead>
            <TableBody>
          
            {events.map(row =>
                  (
                <TableRow key={row.id}>
               
               <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.arena}</TableCell>

                <TableCell align="center">{row.day}</TableCell>
                <TableCell align="center">{row.start}</TableCell>
                <TableCell align="center">{row.duration}</TableCell>
                <TableCell align="center"><Button onClick={e => dropSigning(e, row.name)}>{"[X]"}</Button></TableCell>
                
                </TableRow>
              ))}


            </TableBody>
          </Table>
        </Paper>
      );


      return (
        <div>
            <p id="TitleOverTable">Autograph Signing</p>
            {eventTable}
        </div>
      );
  }
}



export default connect(mapStateToProps)(AthleteSigningScheduler)