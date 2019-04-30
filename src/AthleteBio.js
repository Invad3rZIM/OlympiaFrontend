import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import {connect} from "react-redux"

import {attemptLogin, logout} from './actions/userActions'
import {updateBio} from './actions/athleteActions'
import store from './store';
import {redirect} from './actions/redirectActions';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { getAllAthletes } from './actions/athleteActions';

import { getAllEvents, getMyEvents } from './actions/eventActions';
import { getAllSecurity } from './actions/securityActions';


function mapStateToProps(state) {
  return {
    user: state.user,
    athlete: state.athlete
  };
}

let name = "Name"
let sex = "Sex"
let age = 0
let heightMap = { "feet": 0, "inches": 0}
let height = 0
let weight = 0
let bio = "Bio"
let username = ""

let myBio = {}

function myProfile(e, x) {
  if (e.Username == x) {
    myBio = e
  }
}


class AthleteBio extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

      this.handleName = this.handleName.bind(this)
      this.handleSex = this.handleSex.bind(this)
      this.handleAge = this.handleAge.bind(this)
      this.handleHeight = this.handleHeight.bind(this)
      this.handleWeight = this.handleWeight.bind(this)
      this.handleBio = this.handleBio.bind(this)
    
  }

  handleName(event) {
    name = event.target.value
  }


  handleSex(event) {
    //  this.setState({[event.target.name]: event.target.value});
    sex = event.target.value;
  }

  handleAge(event) {
    age = event.target.value
  }

  handleHeight(type, event) {
  //  this.setState({[event.target.name]: event.target.value});
  // to-do kirk height style conversion 10* ft, + inches for api
    if (type == "FEET") {
      heightMap.feet = Number(event.target.value)
    }
    else if (type == "INCHES") {
      heightMap.inches = Number(event.target.value)
    }

  height = (heightMap.feet*100) + heightMap.inches
  }

  handleWeight(event) {
    //  this.setState({[event.target.name]: event.target.value});
    weight = Number(event.target.value);
    }

  handleBio(event)  {
    bio = event.target.value
    
  }

    handleSubmit(event) {
   
   
      
    updateBio(username, height, weight, sex, bio, age)
    getAllAthletes()
    }

    

  handleChange(event) {
   
  }



  createUser() {
    redirect("CREATE_USER")
  }



  render() {
    username = this.props.user.username
    
    var s = this.props.athlete.allAthletes

    let bio = {}

    for(var i = 0; i < s.length; i++) {
      if (s[i].Username == this.props.user.username) {
        bio = s[i]
        break;
      }
    }

    if (bio.sex == "") {
      bio.sex = "Sex"
    }

    if(bio.weight == null) {
      bio.weight = "lbs"
    }


    if(bio.feet == null) {
      bio.feet = "ft"
    }


    if(bio.inches == null) {
      bio.inches = "in"
    }


    return (
      <div className="athlete-bio">
      <Paper elevation={1}>
      <form className="athlete-bio__form">
      <br/> <br/>
    <p>{bio.First + "'s Bio!"}</p>
    <p>Sex: <Select
    // to-do default value and displaying selection
        name="Sex"
        value= {this.sex}
        onChange={this.handleSex}>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>

    </p>
    <p>Age: <Input type="text" placeholder={"" + bio.Age} name="age" onChange={this.handleAge}></Input></p>
    <p>Ft: <Select
    // to-do default value and displaying selection
        name="Feet"
        value= {""+bio.feet}
        onChange={(e) => this.handleHeight("FEET", e)}>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
        </Select>
         In: <Select
    // to-do default value and displaying selection
        name="Inches"
        value= {"" + bio.inches}
        onChange={(e) => this.handleHeight("INCHES", e)}>
       
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="11">11</MenuItem>


        </Select>

    </p>
    <p>Weight: <Input type="number" placeholder={""+bio.Weight} name="weight" onChange={this.handleWeight}></Input></p>
    <p>Bio: <Input type="text" placeholder={""+bio.Bio} name="bio" onChange={this.handleBio}></Input></p>
  
    <br/>
      <Button variant="contained" color="primary" onClick={this.handleSubmit}>Submit</Button>
      </form>
      </Paper>
    </div>
    );
  }
}

export default connect(mapStateToProps)(AthleteBio)