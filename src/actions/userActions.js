import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";
import { getAllEvents, getMyEvents } from "./eventActions";

export function attemptLogin(user, pass) {
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
            getMyEvents(user)
            store.dispatch((dispatch) =>
            {
                dispatch({type:"ATTEMPT_LOGIN", payload:{username: user, key: responseJson.Key, firstname : responseJson.First, lastname : responseJson.Last, usertype: responseJson.UserType}})
                dispatch({type: "CLEAR", payload:{}})
            })  
         if (responseJson.Key != 0 ) {
            redirect("DASHBOARD")
            getMyEvents(user)
         } else {
            console.log("RFM, INVALID LOGIN")
            store.dispatch({type:"INVALID_LOGIN", payload:{}})
            }
        }).catch((error) => {
        });
}

export function createUser(first, last, user, pass, type) {
    console.log(first + " " + last +  " " + user + " " +pass + " " + type)
    fetch('https://olympiabackend.appspot.com/users/taken', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            username: user,
        }),
        }).then((response) => response.json()).then((responseJson) => {
            console.log("   DDDD " + responseJson.Available)
            if(responseJson.Available == true) {
             // store.dispatch({type:"CREATE_USER", payload:{username: user, key: responseJson.Key, firstname : first, lastname : last, userType: responseJson.UserType} })
            fetch('https://olympiabackend.appspot.com/users/new', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    firstname: first,
                    lastname : last, 
                    usertype : type,
                    username: user,
                    password: pass
                }),
                }).then((response) => response.json()).then((responseJson) => {
                
                    getAllEvents()
                    
                store.dispatch((dispatch) =>
                {
                    dispatch({type:"CREATE_USER", payload:{username: user, key: responseJson.Key, firstname : first, lastname : last, usertype: responseJson.UserType}})
                    dispatch({type: "CLEAR", payload:{}})
                })
                redirect("DASHBOARD")
                }).catch((error) => {
                });
            } else {

            store.dispatch({type:"USER_TAKEN", payload:{}})
            }
        }).catch((error) => {

        });
}

export function logout() {
    store.dispatch({type:"LOGOUT", payload:{}})
}