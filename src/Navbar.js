import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { redirect } from './actions/redirectActions';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { red } from '@material-ui/core/colors';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


// redirects
const logout = () => {
  redirect("LOGIN")
};

const redirectCompetition = () => {
  redirect("ATHLETE_COMPETITION")
};

const redirectSigning = () => {
  redirect("SCHEDULE_SIGNING")
};

const redirectBio = () => {
  redirect("SET_BIO")
};

const redirectTickets = () => {
  redirect("ATHLETE_PURCHASE")
};

const redirectEvents = () => {
  redirect("MY_EVENTS")
};

const redirectNewArena = () => {
  redirect("CREATE_ARENA")
};
const redirectNewEvent = () => {
  redirect("CREATE_EVENT")
};


function ButtonAppBar(props) {

  const { classes } = props;
  console.log("NAV BAR: " + props.redirects)
  var redirects = props.redirects

  var user_type = props.type
    switch(user_type) {
        case "public" :
            var navList = (
            <div>  
              </div>
            )
            break

            case "staff" : 
            var navList = (
                <div>
                </div>
            )
             break

            case "athlete" : 
            var navList =(
                    <div>      
                        <Button  color="inherit" onClick={redirectCompetition}>Compete</Button>
                        <Button  color="inherit" onClick={redirectSigning} >Autotgraphs</Button>
                        <Button  color="inherit" onClick={redirectBio} >Set Bio</Button>
                        <Button  color="inherit" onClick={redirectTickets} >Buy Tickets</Button>
                        <Button  color="inherit" onClick={redirectEvents} >My Events</Button>
                    </div>
            )

            break
                case "admin" : 
                var navList = (
                    <div>
                        <Button  color="inherit" onClick={redirectNewArena}>Create Arena</Button>
                        <Button  color="inherit" onClick={redirectNewEvent} >Create Event</Button>
                    </div>
                )
                break
                case "guard" : 
                var navList = (
                    <div>
                    </div>
                )
                break
                case "officer" : 
                var navList = (
                    <div>
                    </div>
                )

                break;

      }
  return (

    
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <p>{props.type.toUpperCase()}</p>
            {navList}
          </Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);