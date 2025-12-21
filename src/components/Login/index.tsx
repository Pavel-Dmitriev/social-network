import { Navigate } from "react-router";
import { connect } from "react-redux";

import { login } from "store/reducers/auth";

import { AppStateType } from "store/redux-store";
import LoginForm from "./LoginForm";

import { FormDataType, MapDispatchPropsType, MapStatePropsType } from "./types";

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: FormDataType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
