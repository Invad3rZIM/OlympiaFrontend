import store from "../store";

export function setOption(page, choice) {
    store.dispatch({type:page , payload:{selection : choice}})
}