import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

import { getUserProfile, getStatus } from "../../redux/profile-reducer";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const profile = useSelector((state) => {
    return state?.profilePage?.profile;
  });
  console.log("🚀 ~ profile:", profile);
  const status = useSelector((state) => state?.profilePage?.status);
  const authorizedUserId = useSelector((state) => state?.auth?.userId);
  const isAuth = useSelector((state) => state?.auth?.isAuth);

  const isOwner = !params.userId;

  const refreshProfile = () => {
    let userId = params.userId;

    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        navigate("/login");
        return;
      }
    }

    dispatch(getUserProfile(userId));
    dispatch(getStatus(userId));
  };

  useEffect(() => {
    refreshProfile();
  }, [params.userId, authorizedUserId]);

  return (
    <div>
      <ProfileInfo
        {...{
          profile,
          status,
          updateStatus,
          isOwner,
          saveProfile,
          savePhoto,
        }}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
