import { ContactsType, PhotosType, PostType } from "store/types";
import {
  ADD_POST,
  DELETE_STATUS,
  SAVE_PHOTO_SUCCESS,
  SET_STATUS,
  SET_USER_PROFILE,
} from "./constants";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "store/redux-store";
import { FormAction } from "redux-form";

export type ActionsTypes =
  | AddPostActionCreatorType
  | SetUserProfileActionType
  | SetStatusActionType
  | DeletePostActionType
  | SavePhotoSuccessActionType
  | FormAction;

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type InitialStateType = {
  posts: PostType[];
  profile: ProfileType | null;
  status: string;
  newPostText: string;
};

export type AddPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

export type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};

export type SetStatusActionType = {
  type: typeof SET_STATUS;
  status: string;
};

export type DeletePostActionType = {
  type: typeof DELETE_STATUS;
  postId: number;
};

export type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
