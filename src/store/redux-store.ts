import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { app, auth, profile, users, dialogs, sidebar } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

export type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const rootReducer = combineReducers({
  app: app,
  auth: auth,
  profilePage: profile,
  usersPage: users,
  dialogsPage: dialogs,
  sidebar: sidebar,
  form: formReducer,
});

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);
// let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//@ts-ignore
window.__store__ = store;

export default store;
