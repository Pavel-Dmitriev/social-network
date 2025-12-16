import { PaginatorPropsType } from "components/common/Paginator/types";
import { UserType } from "store/reducers/users/types";

export interface UserPropsType {
  user: UserType;
  followingInProgress: number[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
}

export interface UsersPropsType
  extends Omit<PaginatorPropsType, "totalItemsCount" | "portionSize"> {
  totalUsersCount: number;
  users: UserType[];
  followingInProgress: number[];
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
}

export interface UsersContainerPropsType
  extends Pick<PaginatorPropsType, "currentPage" | "pageSize">,
    UsersPropsType {
  getUsers: (currentPage: number, pageSize: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  isFetching: boolean;
}
