import { InjectedFormProps, reduxForm } from "redux-form";

import { createField, TextArea } from "components/common/FormControls";
import { NewMessageFormType, NewMessageFormValuesKeysType } from "../types";
import { IAddMessageForm } from "../interfaces/IAddMessageForm";
import { maxLengthCreator, required } from "utils/validators";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm: React.FC<
  InjectedFormProps<NewMessageFormType, IAddMessageForm> & IAddMessageForm
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {createField<NewMessageFormValuesKeysType>(
        "Enter your message",
        "newMessageBody",
        [required, maxLength50],
        TextArea
      )}

      <button>Отправить</button>
    </form>
  );
};

export default reduxForm<NewMessageFormType>({
  form: "dialog-add-message-form",
})(AddMessageForm);
