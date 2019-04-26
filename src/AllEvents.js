import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {getAllEvents, eventPair, eventStaffPrice, eventPublicPrice} from './actions/eventActions'
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

function getData(name, arena, current, capacity, ticketPrice, staffPrice, duration) {
  id += 1;

  if(arena == null || arena.Name == "") {
    return { id, name, arena : "Select Arena", current, capacity, ticketPrice, staffPrice, duration, arenaLabel : "" + id };
  } else {
    return { id, name, arena : arena.Name, current, capacity, ticketPrice, staffPrice, duration, arenaLabel : "" + id };
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleStaffPriceChange = this.handleStaffPriceChange.bind(this);
    this.handlePublicPriceChange = this.handlePublicPriceChange.bind(this);
      
  }

  handleChange(event) {

    

    this.setState({[event.target.name]: event.target.value});
  }

  handleArenaChange(event) {
    eventPair(event.target.name, event.target.value)
    getAllEvents()
  }

  handleStaffPriceChange(event) {

    if(event.target.value > 0)
    eventStaffPrice(event.target.name, event.target.value)
    
  }

  handlePublicPriceChange(event) {
    if(event.target.value > 0)
    eventPublicPrice(event.target.name, event.target.value)
  
  }

  handleSubmit(event) {

    event.preventDefault();
  }


  render() {
      var events = this.props.event.allEvents

      var arenas = this.props.arena.allArenas

      var arenaOptions = arenas.map((d) => (<MenuItem key={d.Name}  value={d.Name}>{d.Name}</MenuItem>))

      //need to sort everything. will do that later.
      var listItems = events.map((d) => getData(d.Name, d.Arena, d.TicketCount, d.Arena.Capacity, d.PublicPrice, d.StaffPrice, d.Duration)) //this render needs to be completed



  var t = (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event</TableCell>
            <TableCell align="right">Arena</TableCell>
            <TableCell align="right">Registration Count</TableCell>
            <TableCell align="right">Event Capacity</TableCell>

            <TableCell align="right">General Ticket Price</TableCell>
            <TableCell align="right">Staff Ticket Price</TableCell>
            <TableCell align="right">Event Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listItems.map(row => (
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
              <TableCell align="right">{row.current}</TableCell>
              <TableCell align="right">{row.capacity}</TableCell>

              <TableCell align="right">$ <Input onBlur={this.handlePublicPriceChange} name={row.name} placeholder={"" + row.ticketPrice}></Input></TableCell>
              <TableCell align="right">$ <Input onBlur={this.handleStaffPriceChange} name={row.name} placeholder={""+ row.staffPrice}></Input></TableCell>

              <TableCell align="right">{row.duration}</TableCell>

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
        </div>
      );
  }
}



export default connect(mapStateToProps)(AllEvents)