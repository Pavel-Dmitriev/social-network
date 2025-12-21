import { reduxForm } from "redux-form";

import { createField, Input } from "components/common/FormControls";

import { required } from "utils/validators";
import style from "./../common/FormsControls.module.css";
import {
  FormDataType,
  LoginFormProps,
  LoginFormOwnPropsType,
  LoginFormFieldKeysType,
} from "./types";

const LoginForm: React.FC<LoginFormProps> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormFieldKeysType>("Email", "email", [required], Input)}
      {createField<LoginFormFieldKeysType>(
        "Password",
        "password",
        [required],
        Input,
        {
          type: "password",
        }
      )}
      {createField<LoginFormFieldKeysType>(
        undefined,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}

      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl &&
        createField<LoginFormFieldKeysType>(
          "Symbols from image",
          "captcha",
          [required],
          Input,
          {}
        )}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default reduxForm<FormDataType, LoginFormOwnPropsType>({
  form: "login",
})(LoginForm);
