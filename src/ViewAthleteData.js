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

  if (name.startsWith("(S) - "))
    name = name.substring(5)

  return { id, name, arena ,  day, start, duration,  flag};
 
 }


class ViewAthleteData extends Component {
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
      var athleteName = this.props.internal.searchAthlete
      let bio = null

      if (athleteName == null) {
        athleteName = ""
      }
  
      for(var i = 0; i < s.length; i++) {
        if (s[i].Username == athleteName) {
          bio = s[i]
          break;
        }
      }

    var pv = []


  var input = (
    <div >
      <br></br>
      <Input placeholder="Search Athlete (username)" onBlur={e => {
        console.log(e.target.value)


        
        setOption("SEARCH_ATHLETE", e.target.value)
      }}></Input>
      <br/>
    </div>
  )

  if (bio == null) {
    return (<div>{input}</div>)
  }

for(var propName in bio) {
    if(propName == "EventsParticipating") {
      pv= bio[propName]
      break;
    }
}

    //  for(var e in bio)
  //    console.log(bio['EventsParticipating'].Event)
  if (pv == null) {
    pv = []
  }

  console.log(pv)  
var t = []
  for(var c in pv) {
    t.push(pv[c])
  }

  
  var b = (
      
    <div>
    <p>This is a view of an athlete's Bio</p>
   <p>Name: {bio["First"] + " " + bio["Last"]}</p>
   <p>Sex: {bio["Sex"]} </p>
   <p>Age: {bio["Age"] + " years old"}</p>
   <p>Height: {parseInt(bio["Height"]/100) + "' " + bio["Height"]%100 +"\"" } </p>
   <p>Weight: {bio["Weight"] + " lbs"}</p>
   <p>Country of Origin: {bio["Country"] }</p>
   <p>Bio:{ bio["Bio"]} </p>

</div>
  )
  
  events = t.map(d =>getData(d.Name, d.Arena, d.Day, d.StartTime, d.Duration, true)) //this render needs to be completed)
    
      var eventTable = (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
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
          {input}

          <br/>

          {b}
            <br/>

            {eventTable}
            <br/>
            <br/>
            <br/>
            <br/>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        </div>
      );
  }
}


export default connect(mapStateToProps)(ViewAthleteData)