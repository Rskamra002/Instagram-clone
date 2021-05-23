import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { profileReducer } from "./UserProfile/profileReducer";

const rootReducer = combineReducers({
    profile: profileReducer
});

const customMiddleware = (store) => (next) => (action) => {
    return typeof action === "function" ? action(store.dispatch) : next(action);
};

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    createComposer(applyMiddleware(customMiddleware))
);