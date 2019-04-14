import store from "../store";

export function errorAlert(error) {
    store.dispatch({type:error , payload:{}})
}