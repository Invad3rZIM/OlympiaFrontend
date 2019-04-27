import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";

export function updateSecurity(event, needed) {

    console.log(event + "  " + needed)

    fetch('https://olympiabackend.appspot.com/security/update', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event : event,
            needed : needed
        }),
        }).then((response) => response.json()).then((responseJson) => {
           getAllSecurity()

            }
        ).catch((error) => {
            console.log("hhh    " + error);
        });
}


export function getAllSecurity() {
    var x = ""

            fetch('https://olympiabackend.appspot.com/security/all', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    x = responseJson
                    console.log(x)


            store.dispatch({type:"ALL_SECURITY_LIST", payload:{allSecurity : x}})
                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}

export function getMyShifts(user) {
    var x = ""

            fetch('https://olympiabackend.appspot.com/event/mine', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username : user
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    console.log( responseJson.Registered)

                    x = responseJson.Registered


            store.dispatch({type:"MY_EVENT_LIST", payload:{myEvents : x}})
                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}
