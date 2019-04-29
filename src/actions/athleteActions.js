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

export function athleteToggleEvent(username2, toggle, event) {
    console.log(username2 + "  " + toggle + "  " + event)
    var x = ""

            fetch('https://olympiabackend.appspot.com/athlete/schedule', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    username : "" + username2,
                    toggle: "" + toggle,
                    event : "" + event
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    getAllAthletes()

                }).catch((error) => {
                    //if event params are empty?
                    console.log(error)
                })

}



export function athleteScheduleSigning(arena, user, day, start, duration) {
    var x = ""

    console.log(user + "     DD ")
            fetch('https://olympiabackend.appspot.com/athlete/signing/open', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    event: "",
                    day: Number(day),
                    start: Number(start),
                    duration: Number(duration),
                    arena: arena,
                    username: user
                }),
                }).then((response) => response.json()).then((responseJson) => {

                    if(responseJson.CanSchedule) {

                        fetch('https://olympiabackend.appspot.com/athlete/signing', {
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                                arena: arena,
                                username: user,
                                day: Number(day),
                                start: Number(start),
                                duration: Number(duration),
                                event : ""
                            }),
                            }).then((response) => response.json()).then((responseJson) => {
            
            
                                getAllAthletes()
                                getAllEvents()
                            }).catch((error) => {
                                //if event params are empty?
                            })



                    }
                    console.log(responseJson)
                    x = responseJson.AllEvents

                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}


export function athleteSigningDrop(user, event) {
    var x = ""

            fetch('https://olympiabackend.appspot.com/athlete/signing/drop', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    event : "" + event,
                    username: "" + user
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    getAllAthletes()

                    getAllEvents()

                }).catch((error) => {
                    //if event params are empty?
                    console.log(error)
                    getAllAthletes()

                    getAllEvents()

                })

}
