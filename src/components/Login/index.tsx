import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getAuthUserData, login } from "store/reducers/auth";

import { AppStateType } from "store/redux-store";
import LoginForm from "./LoginForm";

import { FormDataType } from "./types";
import { ActionsTypes } from "store/reducers/auth/types";
import { ThunkDispatch } from "redux-thunk";
import { useEffect } from "react";

const Login = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl,
  );

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch =
    useDispatch<ThunkDispatch<AppStateType, unknown, ActionsTypes>>();

  const onSubmit = (formData: FormDataType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha,
      ),
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      dispatch(getAuthUserData());
    }
  }, []);

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className="place-items-center">
      <h1>Login</h1>

      <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};

export default Login;
