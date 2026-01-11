import React from "react";

import { IPost } from "components/Profile/interfaces/IPost";

const Post: React.FC<IPost> = (props) => {
  return (
    <div>
      <div>
        <img src="https://otvet.imgsmail.ru/download/182427258_0bb1727d0ad2c4a1f38d521722da183f_800.png" />
        <span>like: {props.likesCount}</span>
      </div>
      <div>{props.message}</div>
    </div>
  );
};

export default Post;
