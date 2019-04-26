import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptCreateArena, getAllArenas} from './actions/arenaActions'
import store from './store';
import { redirect } from './actions/redirectActions';
import Navigation from './Navigation';

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
        <div>
            <Navigation/>

            {s}
            <form>
                <input type="text" name="name" onChange={this.handleChange} placeholder="arena name"></input>
                <input type="number" name="capacity"  onChange={this.handleChange}  placeholder="capacity"></input>
                <p>IS OUTDOORS?</p> <input type="checkbox" name="outdoors"  onChange={this.handleChange}  placeholder="Is Outdoors?"></input>
                <p>IS AQUATIC?</p> <input type="checkbox" name="aquatic"  onChange={this.handleChange}  placeholder="Is Aquatic?"></input>
                <p>HAS TRACK?</p>  <input type="checkbox" name="track"  onChange={this.handleChange}  placeholder="Has Track?"></input>
                <p>HAS FIELD?</p>  <input type="checkbox" name="field"  onChange={this.handleChange}  placeholder="Has Field?"></input> 
                <button type="submit" name="submit"  onClick={this.handleSubmit}  placeholder="Create Arena!">Create Arena</button>
            </form>
        </div>
    )
  }
}

export default connect(mapStateToProps)(NewArena)