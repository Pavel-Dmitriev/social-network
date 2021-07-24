import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './FriendItem.module.css'


const FriendItem = (props) => {
  return (
    <div className={s.friendItem + ' ' + s.active}>
        <img className={s.friendAvatar} src={props.avatar} />
        <span>{props.name}</span>
    </div>
  )
}


export default FriendItem