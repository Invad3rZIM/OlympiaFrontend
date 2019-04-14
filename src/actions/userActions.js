import store from "../store";

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
         store.dispatch({type:"ATTEMPT_LOGIN", payload:{username: user, password: pass, key: responseJson.Key, userType: responseJson.UserType} })
           
        }).catch((error) => {
        });
}

export function logout() {
    store.dispatch({type:"LOGOUT", payload:{}})
}