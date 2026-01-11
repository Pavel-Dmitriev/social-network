import React, { memo } from "react";

import AddPostForm from "./AddPostForm";
import Post from "./Post";

import { IAddPostFormValues } from "../interfaces/IAddPostFormValues";
import { DispatchPropsType, MapPropsType } from "../types";

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  let postsElements = props.posts.map((it) => (
    <Post key={it.id} message={it.message} likesCount={it.likesCount} />
  ));

  let onAddPost = (values: IAddPostFormValues) => {
    props.addPost(values.newPostText);
  };

  return (
    <div>
      My posts
      <AddPostForm onSubmit={onAddPost} />
      <div>{postsElements}</div>
    </div>
  );
};

export default memo(MyPosts);
