import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { IAddPostForm } from "components/Profile/interfaces/IAddPostForm";
import { IAddPostFormValues } from "components/Profile/interfaces/IAddPostFormValues";
import { createField, TextArea } from "components/common/FormControls";
import { AddPostFormValuesKeysType } from "components/Profile/types";
import { maxLengthCreator, required } from "utils/validators";

const maxLength10 = maxLengthCreator(10);

const AddPostForm: React.FC<
  InjectedFormProps<IAddPostFormValues, IAddPostForm> & IAddPostForm
> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField<AddPostFormValuesKeysType>(
          "Новый пост",
          "newPostText",
          [required, maxLength10],
          TextArea
        )}
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

export default reduxForm<IAddPostFormValues, {}>({ form: "profile-add-post" })(
  AddPostForm
);
