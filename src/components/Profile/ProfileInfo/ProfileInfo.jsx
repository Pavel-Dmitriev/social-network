import React from 'react'
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import userPhoto from '../../../assets/images/avatar.png'

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  return (
    <div >
      {/*<div>*/}
      {/*  <img src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350' />*/}
      {/*</div>*/}
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto}/>
        { isOwner && <input type={"file"} onChange={onMainPhotoSelected}/> }
        {/*<span>{profile.aboutMe}</span>*/}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>

    </div>
  )
}

export default ProfileInfo;