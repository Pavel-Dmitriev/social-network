import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './DialogItem.module.css'


const DialogItem = (props) => {
  return (
    <div className={s.dialog + ' ' + s.active}>
        <img src={props.avatar} />
      <NavLink className={s.link} to={'/dialogs/' + props.id}>{props.name}</NavLink>
    </div>
  )
}


export default DialogItem