import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";
import { getAllEvents } from "./eventActions";

export function updateBio(athlete, height, weight, sex, bio, age) {
    console.log(athlete + " " + height + " " + weight + " " + sex + " " + bio + " " + age)

    if (height == 0) {
        height = -1;
    }

    if (weight == 0 ) {
        weight = -1;
    }

    if (sex == "Sex") {
        sex = ""
    }

    if (bio == "Bio") {
        bio = ""
    }

    if (age == 0) {
        age = -1
    }

    console.log("AGE : " + age)

    fetch('https://olympiabackend.appspot.com/athlete/bio', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            username : athlete,
            height : Number(height),
            weight : Number(weight),
            sex : sex,
            bio : bio,
            age: Number(age)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            getAllAthletes()
            
        }).catch((error) => {
            getAllAthletes()
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
                    x = responseJson.AllAthletes
                  

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
