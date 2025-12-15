import React from "react";
// import { addPostActionCreator } from "../../../store/profile-reducer/profile-reducer";
// import MyPosts from "./MyPosts";
import { connect } from "react-redux";

// const MyPostsContainer = (props) => {
//
//   let state = props.store.getState()
//
//   let addPost = () => {
//     props.store.dispatch(addPostActionCreator())
//   }
//
//   let onPostChange = (text) => {
//     let action = updateNewPostTextActionCreator(text)
//     props.store.dispatch(action)
//   }
//
//   return (
//     <MyPosts
//       updateNewPostText={onPostChange}
//       addPost={addPost}
//       posts={state.profilePage.posts}
//       newPostText={state.profilePage.newPostText}
//     />)
//
// }

// const mapStateToProps = (state) => {
//   return {
//     posts: state.profilePage.posts,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (newPostText) => {
//       dispatch(addPostActionCreator(newPostText));
//     },
//   };
// };

// const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
const MyPostsContainer = () => <div>Posts</div>;

export default MyPostsContainer;
