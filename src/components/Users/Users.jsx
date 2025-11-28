import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

function Users(props) {
  const {
    currentPage,
    totalUsersCount,
    pageSize,
    onPageChanged,
    users,
    ...rest
  } = props;

  return (
    <div>
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
            followingInProgress={rest.followingInProgress}
            key={u.id}
            unfollow={rest.unfollow}
            follow={rest.follow}
          />
        ))}
      </div>
    </div>
  );
}

export default Users;
