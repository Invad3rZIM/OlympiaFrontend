import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptCreateArena, getAllArenas} from './actions/arenaActions'
import store from './store';
import { redirect } from './actions/redirectActions';
import Navigation from './Navigation';
import ArenaTable from './ArenaTable.js'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container, 
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

function mapStateToProps(state) {
  return {
    errors: state.errors

  };
}

class NewArena extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        name : "",
        capacity : 0,
        outdoors : "off",
        aquatic : "off",
        track : "off",
        field : "off"
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {

    attemptCreateArena(this.state.name, this.state.capacity, this.state.outdoors, this.state.aquatic, this.state.track, this.state.field)
    getAllArenas()
    event.preventDefault();
  }

  
  render() {

      if (this.props.errors.error == "success") {
        var s = (<p>Arena Added!</p>)
      }

    return (
        <div >
            <ArenaTable></ArenaTable>
            <br/><br/>
            {s}
         
            <form className="create-arena-form" >
            <p class="center-text">Create Arena</p>
            <br></br>
                <Input type="text" name="name" onChange={this.handleChange} placeholder="Arena name"></Input><br /><br />
                <Input type="number" name="capacity"  onChange={this.handleChange}  placeholder="Capacity"></Input><br /><br />
                <p id="CheckBoxInput">IS OUTDOORS?<input type="checkbox" name="outdoors" id="CheckBoxInput" onChange={this.handleChange}  placeholder="Is Outdoors?"></input> </p> 
                <p>IS AQUATIC? <input type="checkbox" name="aquatic"  onChange={this.handleChange}  placeholder="Is Aquatic?"></input></p>
                <p>HAS TRACK?  <input type="checkbox" name="track"  onChange={this.handleChange}  placeholder="Has Track?"></input></p>
                <p>HAS FIELD?  <input type="checkbox" name="field"  onChange={this.handleChange}  placeholder="Has Field?"></input> </p>
                <br></br>
                <Button type="submit" color="primary" variant="contained" name="submit"  onClick={this.handleSubmit}  placeholder="Create Arena!">Create Arena</Button>
            </form>
        </div>
    )
  }
}

export default connect(mapStateToProps)(NewArena)