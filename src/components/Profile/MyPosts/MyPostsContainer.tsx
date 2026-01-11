import { connect } from "react-redux";

import MyPosts from "../MyPosts";

import { AppStateType } from "store/redux-store";
import { actions } from "store/reducers/profile";

import { DispatchPropsType, MapPropsType } from "../types";

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<
  MapPropsType,
  DispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(MyPosts);

export default MyPostsContainer;
