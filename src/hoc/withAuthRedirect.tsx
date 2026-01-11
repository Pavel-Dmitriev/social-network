import React from "react";
import { Navigate } from "react-router";
import { connect } from "react-redux";
import { AppStateType } from "store/redux-store";

type MapPropsType = { isAuth: boolean };

let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

export function withAuthRedirect(WrappedComponent: React.ComponentType<any>) {
  return connect<MapPropsType, {}, any, AppStateType>(mapStateToProps)(
    ({ isAuth, ...props }: MapPropsType & any) =>
      !isAuth ? <Navigate to="/login" /> : <WrappedComponent {...props} />
  );
}
