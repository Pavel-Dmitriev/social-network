import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { app, auth, profile, users, dialogs, sidebar, chat } from "./reducers";
import { reducer as formReducer } from "redux-form";
import { thunk } from "redux-thunk";

export type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const rootReducer = combineReducers({
  app: app,
  auth: auth,
  profilePage: profile,
  usersPage: users,
  dialogsPage: dialogs,
  sidebar: sidebar,
  chat,
  form: formReducer,
});

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//@ts-ignore
window.__store__ = store;

export default store;
