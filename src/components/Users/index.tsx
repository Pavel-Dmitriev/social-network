import React, { useEffect } from "react";
import Paginator from "../common/Paginator";
import User from "./User";
import SearchUsers from "./SearchUsers";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from "store/user-selectors";
import { follow, requestUsers, unfollow } from "store/reducers/users";
import { FilterType } from "store/reducers/users/types";
import { Preloader } from "components/common/Preloader";

const Users: React.FC = () => {
  const isFetching = useSelector(getIsFetching);
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };
  const userFollow = (userId: number) => {
    dispatch(follow(userId));
  };
  const userUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  useEffect(() => {
    dispatch(requestUsers(1, pageSize, filter));
  }, []);

  return (
    <div>
      <h2>Пользователи</h2>

      {isFetching && <Preloader />}

      <SearchUsers onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            followingInProgress={followingInProgress}
            key={u.id}
            unfollow={userUnfollow}
            follow={userFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
