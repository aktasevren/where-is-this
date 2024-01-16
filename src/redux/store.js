import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/index"


export default function configureStore() {
    return createStore(reducers)
}