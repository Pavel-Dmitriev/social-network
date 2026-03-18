import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "store/reducers/auth";

import { AppStateType } from "store/redux-store";
import LoginForm from "./LoginForm";

import { FormDataType, MapDispatchPropsType, MapStatePropsType } from "./types";

const Login = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl,
  );
  console.log(captchaUrl);

  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

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
