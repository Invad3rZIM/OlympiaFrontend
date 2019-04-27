import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";

export function attemptCreateEvent(name, duration, outdoors, aquatic, track, field) {

    console.log(name + " "  +  " " + duration +  outdoors+ " " +aquatic+ " " + track + " " + field)

    fetch('https://olympiabackend.appspot.com/event/taken', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            name : name
        }),
        }).then((response) => response.json()).then((responseJson) => {
            if(responseJson.Available == true) {
            fetch('https://olympiabackend.appspot.com/event/new', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name : String(name),
                    duration : Number(duration),
                    track : String(track), 
                    aquatic : String(aquatic),
                    outdoors : String(outdoors),
                    field : String(field)
                }),
                }).then((response) => response.json()).then((responseJson) => {

                    console.log("777    " + responseJson.Capacity);
                    console.log("event successfully created!")
                


                    if(responseJson.Name != "") {
                     getAllEvents()   
                    }

                return 
                }).catch((error) => {
                    //if event params are empty?
                });
            } else {
                    //if event name is already taken.
            store.dispatch({type:"EVENT_TAKEN", payload:{}})
            }
        }).catch((error) => {
            console.log("hhh    " + error);
        });
}


export function getAllEvents() {
    var x = ""

            fetch('https://olympiabackend.appspot.com/event/all', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    console.log("WE DID IT!! " )

                    x = responseJson.AllEvents


            store.dispatch({type:"ALL_EVENT_LIST", payload:{allEvents : x}})
                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}

export function getMyEvents(user) {
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


export function schedule(event, day, start, duration) {
    var x = ""

            fetch('https://olympiabackend.appspot.com/event/schedule/open', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    event: event,
                    day: Number(day),
                    start: Number(start),
                    duration: Number(duration)
                }),
                }).then((response) => response.json()).then((responseJson) => {

                    if(responseJson.CanSchedule) {


                        fetch('https://olympiabackend.appspot.com/event/schedule', {
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                                event: event,
                                day: Number(day),
                                start: Number(start),
                                duration: Number(duration)
                            }),
                            }).then((response) => response.json()).then((responseJson) => {
            
            
                            }).catch((error) => {
                                //if event params are empty?
                            })



                    }

                    getAllEvents()
                    console.log(responseJson)
                    x = responseJson.AllEvents

                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}


export function eventPair(e, a) {
    fetch('https://olympiabackend.appspot.com/event/pair', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event: e,
            arena: a
        }),
        }).then((response) => response.json()).then((responseJson) => {
        
            
        }).catch((error) => {
            console.log("XXX" + error)
            //if event params are empty?
        })

}

export function eventStaffPrice(e, a) {
    console.log(e + "   " + a)
    fetch('https://olympiabackend.appspot.com/event/price/staff', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event: e,
            price: Number(a)
        }),
        }).then((response) => response.json()).then((responseJson) => {
            getAllEvents()
            
        }).catch((error) => {
            console.log("XXX" + error)
            //if event params are empty?
        })

}


export function eventPublicPrice(e, a) {

    fetch('https://olympiabackend.appspot.com/event/price/public', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event: e,
            price: Number(a)
        }),
        }).then((response) => response.json()).then((responseJson) => {
        
            getAllEvents()
        }).catch((error) => {
            //if event params are empty?
        })

}

export function buyTicket(e, user, count, free) {
    console.log(e + "  " + user + "  " + count + "  " + free)
    fetch('https://olympiabackend.appspot.com/event/ticket', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            event: e,
            count: Number(count),
            username : user,
            free: free
        }),
        }).then((response) => response.json()).then((responseJson) => {
            getAllEvents()
            getMyEvents(user)
        }).catch((error) => {
            //if event params are empty?
        })

}