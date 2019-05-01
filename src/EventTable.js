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
import { athleteToggleEvent, athleteScheduleSigning, athleteSigningDrop } from './actions/athleteActions';
import Navigation from './Navigation.js';

function icon(b) {
    if (b == true) {
        return "O"
    }
}

function mapStateToProps(state) {
  return {
    event: state.event,
    arena: state.arena,
    athlete : state.athlete,
    user: state.user
  };
}

let username = ""

class EventTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: '',
        data : []
      };

    this.needed = []
  }


  render() {
      username = this.props.user.username
      var events = this.props.event.allEvents

      var arenas = this.props.arena.allArenas

      const paperStyles = {
        padding: '20px',
      };  

      var eventTable = (
        <Paper style={paperStyles}>
          <Table>
            <TableHead id="TableHeadRow">

            <TableRow id="TableHeadRow">
                <TableCell id="TableHeadCell" align="center">Arena</TableCell>
                <TableCell id="TableHeadCell" align="center">Capacity</TableCell>
                <TableCell id="TableHeadCell" align="center">Outdoors</TableCell>
                <TableCell id="TableHeadCell" align="center">Field</TableCell>
                <TableCell id="TableHeadCell" align="center">Track</TableCell>
                <TableCell id="TableHeadCell" align="center">Aquatic</TableCell>
              </TableRow>
              
            </TableHead>
            <TableBody>
          
            {arenas.map(row =>
                  (
                <TableRow key={row.id}>
            
            <TableCell align="center">{row.Name}</TableCell>
                <TableCell align="center">{row.Capacity}</TableCell>
                <TableCell align="center">{icon(row.IsOutdoors)}</TableCell>
                <TableCell align="center">{icon(row.HasField)}</TableCell>
                <TableCell align="center">{icon(row.HasTrack)}</TableCell>
                <TableCell align="center">{icon(row.IsAquatic)}</TableCell>
                
            </TableRow>
                
              ))}


            </TableBody>
          </Table>
        </Paper>
      );


      return (
        <div>
            <p>Participatory Olympic Events</p>      
           
            <br/>

            {eventTable}
        </div>
      );
  }
}

export default connect(mapStateToProps)(EventTable)