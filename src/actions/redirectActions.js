import store from "../store";

export function redirect(page) {
    store.dispatch({type:page , payload:{}})
}