import { applyMiddleware, combineReducers, createStore } from "redux";
import { app, auth, profile, users, dialogs, sidebar } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  app: app,
  auth: auth,
  profilePage: profile,
  usersPage: users,
  dialogsPage: dialogs,
  sidebar: sidebar,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
