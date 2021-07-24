import React from 'react'
import s from './Message.module.css'

const Message = (props) => {
  return (
    <div className={s.dialog}>
      <div className={s.dialogItem}>{props.messages}</div>
    </div>
  )
}

export default Message