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


class AllEvents extends Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleStaffPriceChange = this.handleStaffPriceChange.bind(this);
    this.handlePublicPriceChange = this.handlePublicPriceChange.bind(this);
      
    this.handleDayChange = this.handleDayChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
      
    this.scheduleUpdate = this.scheduleUpdate.bind(this);
  }

  handleChange(event) {

    

    this.setState({[event.target.name]: event.target.value});
  }

  handleArenaChange(event) {
    eventPair(event.target.name, event.target.value)
    getAllEvents()
  }

  handleStaffPriceChange(event) {

    if(event.target.value > 0) {
      var dollars = Math.round(Number(event.target.value) * 100) / 100
      eventStaffPrice(event.target.name, dollars)
   } 
    
  }

  handlePublicPriceChange(event) {
    if(event.target.value > 0) {
      var dollars = Math.round(Number(event.target.value) * 100) / 100
      eventPublicPrice(event.target.name, dollars)
    }
  
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  
  handleDurationChange(name, event) {
    // console.log(event.target.value)

     let mt = event.target.value

     let at = parseInt(mt/100) * 60 + mt%100

     //let dt = parseInt(duration/100) * 60 + duration%100

     this.durations[name] = at
     console.log(this.startTimes[name])

    event.preventDefault();
  }
  
  handleDayChange(name, event) {
    // console.log(event.target.value)

     //let dt = parseInt(duration/100) * 60 + duration%100

     this.days[name] = event.target.value

    event.preventDefault();
  }

  scheduleUpdate(name, day, start, duration, event) {

    let d = this.days[name]

    if (d == null || d == 0) 
    d = day;

    
    let s = this.startTimes[name]

    if(s == null || s == 0)
    s = parseInt(start/100) * 60 + start%100

    let dur = this.durations[name]

    if (dur == null || dur == 0)
    dur = parseInt(duration/100) * 60 + duration%100


    schedule(name, d, s, dur)


  }
  
  handleStartChange(name, event) {
    // console.log(event.target.value)

     let mt = event.target.value

     let at = parseInt(mt/100) * 60 + mt%100

     //let dt = parseInt(duration/100) * 60 + duration%100

     this.startTimes[name] = at
     console.log(this.startTimes[name] + "   " + this.durations[name])

    event.preventDefault();
  }


  render() {
      var events = this.props.event.allEvents

      var arenas = this.props.arena.allArenas

      var arenaOptions = arenas.map((d) => (<MenuItem key={d.Name}  value={d.Name}>{d.Name}</MenuItem>))

      //need to sort everything. will do that later.
      var listItems = events.map((d) => getData(d.Name, d.Arena, d.TicketCount, d.ArenaCapacity, d.PublicPrice, d.StaffPrice, d.Day, d.StartTime, d.Duration)) //this render needs to be completed
      listItems = listItems.filter(d => {
        return !d.name.startsWith("(S) - ")
      })
  
      const paperStyles = {
        padding: '20px',
      };

  var t = (
    <Paper style={paperStyles}>
      <Table>
        <TableHead id="TableHeadRow">
          <TableRow id="TableHeadRow">
            <TableCell id="TableHeadCell">Event</TableCell>
            <TableCell id="TableHeadCell" align="right">Arena</TableCell>
            <TableCell id="TableHeadCell" align="right">Registration Count</TableCell>
            <TableCell id="TableHeadCell" align="right">Event Capacity</TableCell>

            <TableCell id="TableHeadCell" align="right">General Ticket Price</TableCell>
            <TableCell id="TableHeadCell" align="right">Staff Ticket Price</TableCell>

            <TableCell id="TableHeadCell" align="right">Event Day</TableCell>
            <TableCell id="TableHeadCell" align="right">Event Start</TableCell>
            <TableCell id="TableHeadCell" align="right">Event Duration</TableCell>
            <TableCell id="TableHeadCell" align="right">Schedule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map(row =>{
          
          return row.name.startsWith("(") ? (

            
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
              <Select

            value={row.arena}
            onChange={this.handleArenaChange}
            input={<Input name={row.name} id="arena-helper" />}
          >
          {arenaOptions}
          </Select>
            
            </TableCell>
              <TableCell align="center">{row.current}</TableCell>
              <TableCell align="center">{row.capacity}</TableCell>

              <TableCell align="center">free</TableCell>
              <TableCell align="center">free</TableCell>

              <TableCell align="center"><Input onBlur={(e) => this.handleDayChange(row.name, e)} name={"" +row.name} placeholder={""+ row.day}></Input></TableCell>
              <TableCell align="center"><Input onBlur={(e) => this.handleStartChange(row.name, e)} name={"" +row.name} placeholder={""+ row.start}></Input></TableCell>
              <TableCell align="center"><Input onBlur={(e) => this.handleDurationChange(row.name, e)} name={"" +row.name} placeholder={""+ row.duration}></Input></TableCell>
              <TableCell align="center"><Button onClick={(e) => this.scheduleUpdate(row.name, row.day, row.start, row.duration, e)} name={"" +row.name} placeholder={""+ row.duration}>Schedule</Button></TableCell>

            </TableRow>
          ) : (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
              <Select

            value={row.arena}
            onChange={this.handleArenaChange}
            input={<Input name={row.name} id="arena-helper" />}
          >
          {arenaOptions}
          </Select>
            
            </TableCell>
              <TableCell align="center">{row.current}</TableCell>
              <TableCell align="center">{row.capacity}</TableCell>

              <TableCell align="center">$ <Input onBlur={this.handlePublicPriceChange} name={row.name} placeholder={"" + row.ticketPrice}></Input></TableCell>
              <TableCell align="center">$ <Input onBlur={this.handleStaffPriceChange} name={row.name} placeholder={""+ row.staffPrice}></Input></TableCell>

              <TableCell align="center"><Input onBlur={(e) => this.handleDayChange(row.name, e)} name={"" +row.name} placeholder={""+ row.day}></Input></TableCell>
              <TableCell align="center"><Input onBlur={(e) => this.handleStartChange(row.name, e)} name={"" +row.name} placeholder={""+ row.start}></Input></TableCell>
              <TableCell align="center"><Input onBlur={(e) => this.handleDurationChange(row.name, e)} name={"" +row.name} placeholder={""+ row.duration}></Input></TableCell>
              <TableCell align="center"><Button onClick={(e) => this.scheduleUpdate(row.name, row.day, row.start, row.duration, e)} name={"" +row.name} placeholder={""+ row.duration}>Schedule</Button></TableCell>

            </TableRow>)})}
        </TableBody>
      </Table>
    </Paper>
  );

      return (
        <div>
            <p id="TitleOverTable">All Events</p>
        {t}
        </div>
      );
  }
}



export default connect(mapStateToProps)(AllEvents)