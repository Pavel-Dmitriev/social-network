import { Navigate } from "react-router";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { login } from "store/reducers/auth";

import { createField, Input } from "../common/FormsControls";

import style from "./../common/FormsControls.module.css";
import { required } from "../../utils/validators/validators";

const LoginForm = ({ handleSubmit, error, captchaUrl }: any) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        null,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}

      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField("Symbols from image", "captcha", [required], Input, {})}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm: any = reduxForm({ form: "login" })(LoginForm);

const Login = (props: any) => {
  const onSubmit = (formData: any) => {
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
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});
export default connect(mapStateToProps, { login })(Login);
