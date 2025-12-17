import { ResultCodeForCaptcha, ResultCodesEnum } from "./enums";

export type MeResponseType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: ResultCodesEnum;
  messages: string[];
};

export type LoginResponseType = {
  data: {
    userId: number;
  };
  resultCode: ResultCodesEnum | ResultCodeForCaptcha;
  messages: string[];
};
