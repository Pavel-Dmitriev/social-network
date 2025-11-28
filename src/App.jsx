import React from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <>
        <main className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div>
            <Routes>
              <Route path="/" element={<NavLink to="/profile" replace />} />
              <Route
                path="/profile/:userId?"
                element={withSuspense(ProfileContainer)}
              />
              <Route path="/dialogs" element={withSuspense(DialogsContainer)} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Routes>
          </div>
        </main>
        {/* футер нужен только для продолжения темного фона от backdrop */}
        <footer className="bg-backdrop h-full"></footer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});
let AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

const AppWrapper = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default AppWrapper;
