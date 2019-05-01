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
import { setOption } from './actions/internalActions';
import EventTable from './EventTable';


function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena,
    athlete : state.athlete,
    user: state.user,
    internal: state.internal
  };
}

let username = ""

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


class ViewEventData extends Component {
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
      var s = this.props.event.allEvents
      var eventName = this.props.internal.searchEvent
      let bio = null

      if (eventName == null) {
        eventName = ""
      }
  
      if (s != null)
      for(var i = 0; i < s.length; i++) {
        console.log(s[i].Name + " q " + eventName)
        if (s[i].Name.toLowerCase() == eventName.toLowerCase()) {
          bio = s[i]
          break;
        }
      }

    var pv = []


  var input = (
    <div>
      <br/>
      <Input placeholder="Search Event (name)" onBlur={e => {
        setOption("SEARCH_EVENT", e.target.value)
      }}></Input>
    </div>
  )

  if (bio == null) {
    return (<div><EventTable/> {input}</div>)
  }

for(var propName in bio) {
  console.log(propName + "  8")
    if(propName == "Athletes") {
      pv= bio[propName]
      break;
    }
}

    //  for(var e in bio)
  //    console.log(bio['EventsParticipating'].Event)
  if (pv == null) {
    pv = []
  }


var t = []
  for(var c in pv) {
    if (pv[c].Country == "") {
      pv[c].Country = "Homeless"
    }
    t.push(pv[c])
  }


  
  events = t

      var eventTable = (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Username (LOOKUP)</TableCell>
                <TableCell align="center">First</TableCell>
                <TableCell align="center">Last</TableCell>
                <TableCell align="center">Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
          
            {events.map(row =>
                  (
                <TableRow key={row.id}>
               
               <TableCell align="center">{row.Username}</TableCell>
               <TableCell align="center">{row.First}</TableCell>
                <TableCell align="center">{row.Last}</TableCell>

                <TableCell align="center">{row.Country}</TableCell>
                </TableRow>
              ))}


            </TableBody>
          </Table>
        </Paper>
      );


      return (
        <div>
          <br/>
          <EventTable/>
          <br/>
          <br/>
          {input}

          <br/>
            <br/>

            {eventTable}
        </div>
      );
  }
}


export default connect(mapStateToProps)(ViewEventData)