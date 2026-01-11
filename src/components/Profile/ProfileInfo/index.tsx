import React, { ChangeEvent, useState } from "react";

import { Preloader } from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/avatar.png";
import ProfileDataForm from "./ProfileDataForm";

import { IProfileInfo } from "../interfaces/IProfileInfo";
import { savePhoto, saveProfile, updateStatus } from "store/reducers/profile";
import { ProfileType } from "store/reducers/profile/types";
import { ProfileData } from "./ProfileData";

const ProfileInfo: React.FC<IProfileInfo> = ({ profile, status, isOwner }) => {
  let [editMode, setEditMode] = useState(false);

  /** Обработчик обновления статуса */
  const handleUpdateStatus = (newStatus: string) => {
    updateStatus(newStatus);
  };

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    // TODO: remove then
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      {/*<div>*/}
      {/*  <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />*/}
      {/*</div>*/}
      <div>
        <img src={profile.photos.large || userPhoto} />
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        {/*<span>{profile.aboutMe}</span>*/}

        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={profile}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks
          status={status}
          updateStatus={handleUpdateStatus}
        />
        {/*Блок с друзьями*/}
        <div>
          <span>Friends</span>
          {/*<Friends friends={props.friends} />*/}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
