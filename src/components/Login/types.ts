import { InjectedFormProps } from "redux-form";

export type MapStatePropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

export type MapDispatchPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
  ) => void;
};

export type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export type LoginFormOwnPropsType = { captchaUrl: string | null };

export type LoginFormProps = LoginFormOwnPropsType &
  InjectedFormProps<FormDataType, LoginFormOwnPropsType>;

export type LoginFormFieldKeysType = Extract<keyof FormDataType, string>;
