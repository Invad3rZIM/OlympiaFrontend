import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import ReactDOM from 'react-dom';

import CommonDataManager from './CommonDataManager';


////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

function Base() {
  return (
    <Router>
      <div>
        <AuthButton />

        <Route path="/" component={Login} />
        <ul>
       {/*}   <li>
            <Link to="/public33">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
  </li>*/}
  </ul>
        
        <PrivateRoute path="/protected" component={Protected} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function Protected() {
  return <h3>Protected</h3>;
}

class UserHome extends Component {
  render() {
    return <div><p>this is only for users!</p></div>;
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        username: '',
        password: ''
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    return (
      <div>
          <form>
              <input type="text" name="username" placeholder="username" onChange={this.handleChange}></input>
              <input type="password" name="password" placeholder="password" onChange={this.handleChange}></input>

              <button type="button" onClick={this.handleSubmit}>Log in</button>
          </form>
      </div>
    );
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    (async () => {
      await this.attemptLogin();


    })();
    event.preventDefault();
  }

  attemptLogin = () => {
    var user = this.state.username;
    var pass = this.state.password;

    fetch('https://olympiabackend.appspot.com/users/login', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    },
    body: JSON.stringify({
        username: user,
        password: pass
    }),
    }).then((response) => response.json()).then((responseJson) => {
   
   //on success


    // When storing data.
    let commonData = CommonDataManager.getInstance();
    commonData.setSessionKey(responseJson.Key);
    commonData.setUsername(this.state.username);

      console.log(commonData.getSessionKey());
      console.log(commonData.getUsername());


      if (CommonDataManager.getInstance().getSessionKey() == 49) {
        ReactDOM.render(
          <UserHome />,
          document.getElementById('root')
          );
  
        }

    }).catch((error) => {
      alert(error);
      //on failure
    });
    }
}

 
export default Base;
