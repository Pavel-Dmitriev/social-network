import React, { act, useEffect } from "react";
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
import { useLocation, useNavigate } from "react-router";

const Users: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    const search = location.search;
    const params = new URLSearchParams(search);
    const paramTerm = params.get("term");
    const paramFriend = params.get("friend");
    const paramCurrentPage = params.get("page");

    const actualPage = Number(paramCurrentPage) || 1;
    let actualFilter = filter;

    if (paramTerm) actualFilter = { ...actualFilter, term: paramTerm };

    switch (paramFriend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
      default:
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    navigate({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    });
  }, [filter, currentPage]);

  return (
    <div>
      <h2>Пользователи</h2>

      {isFetching ? (
        <div className="mt-5 place-items-center">
          <Preloader />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Users;
