import React from 'react'
import {HashRouter, Route, withRouter} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import UsersContainer from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import Login from "./components/Login/Login"
import {connect, Provider} from "react-redux"
import {compose} from "redux"
import {initializeApp} from "./redux/app-reducer"
import {Preloader} from "./components/common/Preloader/Preloader"
import store from './redux/redux-store'
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
          <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/login' render={() => <Login/>}/>
        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})
let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp})) (App)

const AppWrapper = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default AppWrapper