import { UsersPropsType } from "./interface";

export type MapStateUsersContainerPropsType = Pick<
  UsersPropsType,
  | "users"
  | "currentPage"
  | "totalUsersCount"
  | "pageSize"
  | "followingInProgress"
> & {
  isFetching: boolean;
};

export type MapDispatchUsersContainerPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};
