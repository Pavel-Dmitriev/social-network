import AddMessageForm from "./AddMessageForm/AddMessageForm";
import DialogItem from "./DialogsItem";

import { IDialogsProps } from "./interfaces/IDialogsProps";
import Message from "./Message";

const Dialogs: React.FC<IDialogsProps> = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogsData.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} avatar={d.avatar} />
  ));
  let messagesElements = state.messages.map((m) => (
    <Message messages={m.message} key={m.id} />
  ));

  let addNewMessage = (values: { newMessageBody: string }) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div>
      <div>{dialogsElements}</div>
      <div>{messagesElements}</div>
      <AddMessageForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
