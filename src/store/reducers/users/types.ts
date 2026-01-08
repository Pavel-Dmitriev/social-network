import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { BaseThunkType, InferActionsTypes, PhotosType } from "store/types";
import { AppStateType } from "store/redux-store";
import { actions } from ".";

export type ActionsTypes = InferActionsTypes<typeof actions>;
export type ThunkType = BaseThunkType<ActionsTypes>;
export type DispatchType = Dispatch<ActionsTypes>;

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
  followed: boolean;
};

export type InitialStateType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  /** Массив id пользователей */
  followingInProgress: number[];
};
