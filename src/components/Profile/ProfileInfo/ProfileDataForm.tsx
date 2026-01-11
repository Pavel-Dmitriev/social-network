import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input, TextArea } from "../../common/FormControls";
import { IProfileDataForm } from "../interfaces/IProfileDataForm";
import { ProfileTypeKeys } from "../types";
import { ProfileType } from "store/reducers/profile/types";

const ProfileDataForm: React.FC<
  InjectedFormProps<ProfileType, IProfileDataForm> & IProfileDataForm
> = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && <div>{error}</div>}
      <div>
        <b>Full name</b>:{" "}
        {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
      </div>
      <div>
        <b>Looking for a job</b>:{" "}
        {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {
          type: "checkbox",
        })}
      </div>

      <div>
        <b>My professional skills</b>:
        {createField<ProfileTypeKeys>(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          TextArea
        )}
      </div>

      <div>
        <b>About me</b>:
        {createField<ProfileTypeKeys>("About me", "aboutMe", [], TextArea)}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key}>
              <b>
                {key}: {/* TODO: придумать как типизировать тут createField */}
                {createField(key, "contacts.".concat(key), [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, IProfileDataForm>({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
