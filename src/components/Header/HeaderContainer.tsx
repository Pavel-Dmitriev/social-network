import React from "react";
import { connect } from "react-redux";

import Header from "./Header";

import { logout } from "../../store/reducers/auth";

import { IHeaderContainerProps, IHeaderProps } from "./interface";
import { AppStateType } from "store/redux-store";
import { DispatchPropsType, MapPropsType } from "./types";

class HeaderContainer extends React.Component<
  MapPropsType & DispatchPropsType
> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps,
  {
    logout,
  }
)(HeaderContainer);
