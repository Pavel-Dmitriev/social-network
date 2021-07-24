import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogsItem/DialogItem'
import Message from './Message/Message'
import AddMessageForm from "./AddMessageForm/AddMessageForm";


const Dialogs = (props) => {

  let state = props.dialogsPage

  // let avatarDialogs = props.state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>)
  let dialogsElements = state.dialogsData.map(d => <DialogItem name={d.name} id={d.id} avatar={d.avatar}/>)
  let messagesElements = state.messages.map(m => <Message messages={m.message} id={m.id}/>)
  let newMessageBody = state.newMessageBody

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {/*<img src={dialogsElements} />*/}
        {dialogsElements}
      </div>
      <div className={s.messages}>
        {messagesElements}
      </div>
      <AddMessageForm onSubmit={addNewMessage}/>
    </div>
  )
}

export default Dialogs