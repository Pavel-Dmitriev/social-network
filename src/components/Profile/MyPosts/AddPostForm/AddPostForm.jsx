import React from 'react';
import s from '../MyPosts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl, Textarea} from "../../../common/FormsControls";

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} elementType='textarea' name="newPostText" placeholder='New post' validate={[required, maxLength10]}/>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

export default reduxForm({form: 'profile-add-post'})(AddPostForm)