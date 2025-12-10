import React from "react";
import { connect } from "react-redux";

import Header from "./Header";

import { logout } from "../../redux/auth-reducer";

import { IHeaderContainerProps } from "./interface";

class HeaderContainer extends React.Component<IHeaderContainerProps> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
