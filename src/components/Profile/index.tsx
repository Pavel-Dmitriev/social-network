import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";

import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo";

import { getUserProfile, getStatus } from "store/reducers/profile";
import { AppStateType } from "store/redux-store";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const profile = useSelector<AppStateType>((state) => {
    return state?.profilePage?.profile;
  });
  const status = useSelector<AppStateType>(
    (state) => state?.profilePage?.status
  );
  const authorizedUserId = useSelector<AppStateType>(
    (state) => state?.auth?.userId
  );
  const isAuth = useSelector<AppStateType>((state) => state?.auth?.isAuth);

  const isOwner = !params.userId;

  const refreshProfile = () => {
    let userId = params.userId;

    if (!(userId || authorizedUserId)) {
      navigate("/login");
      return;
    }

    dispatch(getUserProfile(Number(userId || authorizedUserId)));
    dispatch(getStatus(Number(userId || authorizedUserId)));
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
          isOwner,
        }}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
