import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { PhotosType } from "store/types";
import { AppStateType } from "store/redux-store";
import { ActionsTypes } from "../users";

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

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
export type DispatchType = Dispatch<ActionsTypes>;
