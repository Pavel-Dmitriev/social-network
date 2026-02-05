import { UserType } from "store/reducers/users/types";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "./enums";
import { PhotosType } from "store/types";

export type GetItemsType = {
  items: UserType[];
  totalCount: number;
  error: null | string;
};

export type ApiResponseType<Data = {}, ResultCode = ResultCodesEnum> = {
  data: Data;
  messages: string[];
  resultCode: ResultCode;
};

export type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseDataType = {
  userId: number;
};

export type SavePhotoResponseDataType = {
  photos: PhotosType;
};

export type GetCaptchaUrl = {
  url: string;
};

export type SubscriberType = (messages: ChatMessageAPIType[]) => void;

export type MessagesReceivedSubscriberType = (
  messages: ChatMessageAPIType[],
) => void;
export type StatusChangedSubscriberType = (status: StatusType) => void;

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
export type StatusType = "pending" | "ready" | "error";
