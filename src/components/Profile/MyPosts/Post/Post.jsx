import React from 'react';
import s from './Post.module.css';

const Post = (props) => {

  return (
    <div className={s.post}>
      <div className={s.post__info}>
        <img src='https://otvet.imgsmail.ru/download/182427258_0bb1727d0ad2c4a1f38d521722da183f_800.png' className={s.post__avatar}/>
        <span className={s.post__likesCount}>like: {props.likesCount}</span>
      </div>
      <div className={s.post__text}>{props.message}</div>
    </div>
  )
}

export default Post;