import {
  BaseThunkType,
  ContactsType,
  InferActionsTypes,
  PhotosType,
  PostType,
} from "store/types";
import {
  ADD_POST,
  DELETE_POST,
  SAVE_PHOTO_SUCCESS,
  SET_STATUS,
  SET_USER_PROFILE,
} from "./constants";
import { actions } from ".";
import { FormAction } from "redux-form";

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

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
  type: typeof DELETE_POST;
  postId: number;
};

export type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: PhotosType;
};
