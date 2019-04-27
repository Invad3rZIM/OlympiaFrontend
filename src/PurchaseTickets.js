import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {getAllEvents, eventPair, eventStaffPrice, eventPublicPrice, buyTicket} from './actions/eventActions'
import store from './store';
import { redirect } from './actions/redirectActions';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';


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
    arena: state.arena,
    user: state.user
  };
}


let id = 0;
let set = new Set();

var dict = []
var taffPrice = []
var publicPrice = []
var count = []

function getData(name, arena, current, capacity, ticketPrice, staffPrice, day, start, duration) {
  id += 1;

  dict[name] = 0;
  taffPrice[name] = staffPrice
  publicPrice[name] = publicPrice
  start = parseInt(start/60) * 100 + start%60
  duration = parseInt(duration / 60 ) * 100 + duration%60


  if(arena == null || arena.Name == "") {
    return { id, name, arena : "TBD", current, capacity, ticketPrice, staffPrice, day, start, duration};
  } else {
    return { id, name, arena : arena.Name, current, capacity, ticketPrice, staffPrice, day, start, duration };
  }
 }


class PurchaseTickets extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        event: "", 
        username: '',
        password: '',
        data : []
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleStaffPriceChange = this.handleStaffPriceChange.bind(this);
    this.handlePublicPriceChange = this.handlePublicPriceChange.bind(this);
    this.buyPublicTickets = this.buyPublicTickets.bind(this)
    this.buyStaffTickets = this.buyStaffTickets.bind(this)
    this.buyAthleteTickets = this.buyAthleteTickets.bind(this)
    
    this.calcPrice = this.calcPrice.bind(this);
    this.setX = this.setX.bind(this);
  }

  handleChange(event) {

    this.setState({[event.target.name]: event.target.value});
  }

  handleArenaChange(event) {
    eventPair(event.target.name, event.target.value)
    getAllEvents()
  }

  handleStaffPriceChange(event) {
    eventStaffPrice(event.target.name, event.target.value)
    
    event.preventDefault();
  }

  handlePublicPriceChange(event) {
    eventPublicPrice(event.target.name, event.target.value)
  
    event.preventDefault();
  }

  buyStaffTickets(event) {
    console.log(this.state.event)
    var n = this.state.event;
    buyTicket(n, this.props.user.username, count[n], "off")

    event.preventDefault();
  }  

  buyPublicTickets(event) {
    console.log(this.state.event)
    var n = this.state.event;
    buyTicket(n, this.props.user.username, publicPrice[n], "off")

    event.preventDefault();
  }

  setX(event) {
  }

  buyAthleteTickets(event) {
    buyTicket(event.target.name, this.props.user.username, count[event.target.name], "off")

    event.preventDefault();
  }

  handleSubmit(event) {

    event.preventDefault();
  }

  calcPrice(event) {
      dict[event.target.name] = taffPrice[event.target.name] * event.target.value
      count[event.target.name] = event.target.value
      this.state.event = event.target.name
      console.log(event.target.name + " XXXX :) X  " + event.target.value)
  
   
        
    var div = document.getElementById(event.target.name + "x");
    div.innerHTML = "" + dict[event.target.name];
    console.log(div)
    event.preventDefault();
  }


  render() {
      var events = this.props.event.allEvents
      var buy = "Buy"
      //need to sort everything. will do that later.
      var listItems = events.map((d) => getData(d.Name, d.Arena, d.TicketCount, d.Arena.Capacity, d.PublicPrice, d.StaffPrice, d.Day, d.StartTime, d.Duration)) //this r
      //ensure taht the tickets purchased must be positive integers = a rob task
      if (this.props.user.usertype == "public") { //public stuff
     
  var t = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Arena</TableCell>
            <TableCell align="right">Tickets Remaining</TableCell>

            <TableCell align="right">Event Duration</TableCell>
            <TableCell align="right">(Public) Ticket Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.arena}</TableCell>
              
              <TableCell align="right">{row.capacity - row.current}</TableCell>


  <TableCell align="right">{row.day}</TableCell>

              
              <TableCell align="right">$ {row.ticketPrice} x <Input type="number" name={row.name}  onBlur={this.calcPrice} align="center" placeholder={"" + 0}  pattern="\d+" min="0" ></Input> = <span id={ row.name + "x"}>{dict[row.name]}</span> </TableCell>
              <TableCell name={row.name} onClick={this.setX}><Button value={row.name} onClick={this.buyPublicTickets}  variant="contained" color="primary" >{buy}</Button></TableCell>
              

            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
      } else {

  var t = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Arena</TableCell>
            <TableCell align="right">Tickets Remaining</TableCell>

            <TableCell align="right">Event Day</TableCell>
            <TableCell align="right">Event Start</TableCell>
            <TableCell align="right">Event Duration</TableCell>
            <TableCell align="right">(Staff) Ticket Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.arena}</TableCell>
              
              <TableCell align="right">{row.capacity - row.current}</TableCell>

              <TableCell align="right">{weekday(row.day)}</TableCell>
            <TableCell align="right">{row.start}</TableCell>
            <TableCell align="right">{row.duration}</TableCell>

              
              <TableCell align="right">$ {row.staffPrice} x <Input type="number" name={row.name}  onBlur={this.calcPrice} align="center" placeholder={"" + 0}  pattern="\d+" min="0" ></Input> = <span id={ row.name + "x"}>{dict[row.name]}</span> </TableCell>
              <TableCell name={row.name} onClick={this.setX}><Button value={row.name} onClick={this.buyStaffTickets}  variant="contained" color="primary" >{buy}</Button></TableCell>
              

            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
       }

      return (
        <div>
            <p>This is a view of all the events currently available for purchase!</p>
        { t}
        </div>
      );
  }
}



export default connect(mapStateToProps)(PurchaseTickets)