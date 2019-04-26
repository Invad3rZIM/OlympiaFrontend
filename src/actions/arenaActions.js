import store from "../store";
import { redirect } from "./redirectActions";
import Dashboard from "../Dashboard";

export function attemptCreateArena(name, cap, outdoors, aquatic, track, field) {

    console.log(name + " " + cap +  " " + outdoors+ " " +aquatic+ " " + track + " " + field)

    fetch('https://olympiabackend.appspot.com/arena/taken', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        },
        body: JSON.stringify({
            name : name
        }),
        }).then((response) => response.json()).then((responseJson) => {
            if(responseJson.Available == true) {
            fetch('https://olympiabackend.appspot.com/arena/new', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name : String(name),
                    cap : Number(cap),
                    track : String(track), 
                    aquatic : String(aquatic),
                    outdoors : String(outdoors),
                    field : String(field)
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    getAllArenas()
                return 
                }).catch((error) => {
                    
                });
            } else {getAllArenas()
            store.dispatch({type:"USER_TAKEN", payload:{}})
            }
        }).catch((error) => {getAllArenas()
        });
}


export function getAllArenas() {
    var x = ""

            fetch('https://olympiabackend.appspot.com/arena/all', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                },
                body: JSON.stringify({
                }),
                }).then((response) => response.json()).then((responseJson) => {
                    console.log("WE DID IT!! " )

                    x = responseJson.AllArenas


            store.dispatch({type:"ALL_ARENA_LIST", payload:{allArenas : x}})
                    
                }).catch((error) => {
                    console.log("XXX" + error)
                    //if event params are empty?
                })

}