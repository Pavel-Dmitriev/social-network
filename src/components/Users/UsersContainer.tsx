import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Users from "../Users";
import { Preloader } from "../common/Preloader";

import { follow, requestUsers, unfollow } from "store/reducers/users";
import { AppStateType } from "store/redux-store";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "store/user-selectors";

import { UsersContainerPropsType } from "./interface";
import {
  MapDispatchUsersContainerPropsType,
  MapStateUsersContainerPropsType,
} from "./types";

class UsersContainer extends React.Component<UsersContainerPropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
        />
      </>
    );
  }
}

const mapStateToProps = (
  state: AppStateType
): MapStateUsersContainerPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<
    MapStateUsersContainerPropsType,
    MapDispatchUsersContainerPropsType,
    {},
    AppStateType
  >(mapStateToProps, {
    follow,
    unfollow,
    getUsers: requestUsers,
  })
)(UsersContainer);
