import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";
import { getAllEvents } from "./eventActions";

export function updateBio(event, needed) {
    fetch('https://olympiabackend.appspot.com/athlete/bio', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event: event,
            needed : Number(needed)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            getAllSecurity()
            getAllEvents()
            
        }).catch((error) => {
            getAllSecurity()
            getAllEvents()
        })

        
}


export function getAllAthletes() {
    var x = ""

            fetch('https://olympiabackend.appspot.com/athlete/all', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    x = responseJson
                    console.log(x)


            store.dispatch({type:"ALL_ATHLETE_LIST", payload:{allAthletes : x}})
                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}

export function athleteToggleEvent(username, toggle, event) {
    var x = ""

            fetch('https://olympiabackend.appspot.com/athlete/schedule', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username : username,
                    toggle: toggle,
                    event : event
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    getAllAthletes()

                }).catch((error) => {
                    //if event params are empty?
                })

}
