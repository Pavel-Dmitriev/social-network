import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { PhotosType } from "store/types";
import {
  FOLLOW,
  SET_CURRENT_PAGE,
  SET_TOTAL_USERS_COUNT,
  SET_USERS,
  TOGGLE_IS_FETCHING,
  TOGGLE_IS_FOLLOWING_PROGRESS,
  UNFOLLOW,
} from "./constants";
import { AppStateType } from "store/redux-store";

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

export type ActionsTypes =
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | ToggleisFetchingActionType
  | ToggleFollowingProgressActionType;

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>;
export type DispatchType = Dispatch<ActionsTypes>;

export type FollowSuccessActionType = {
  type: typeof FOLLOW;
  userId: number;
};
export type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export type SetUsersActionType = {
  type: typeof SET_USERS;
  users: UserType[];
};
export type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};
export type ToggleisFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
};
export type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
