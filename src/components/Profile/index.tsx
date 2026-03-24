import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router";

import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo";

import { getUserProfile, getStatus } from "store/reducers/profile";
import { AppStateType } from "store/redux-store";
import { ThunkDispatch } from "redux-thunk";
import { ActionsTypes } from "store/reducers/profile/types";
import { getAuthUserData, logout } from "store/reducers/auth";

const Profile = () => {
  const params = useParams();
  const dispatch =
    useDispatch<ThunkDispatch<AppStateType, unknown, ActionsTypes>>();
  const token = localStorage.getItem("auth-token");

  const profile = useSelector<AppStateType>((state) => {
    return state?.profilePage?.profile;
  });
  const status = useSelector<AppStateType>(
    (state) => state?.profilePage?.status,
  );
  const authorizedUserId = useSelector<AppStateType>(
    (state) => state?.auth?.userId,
  );
  const isAuth = useSelector<AppStateType>((state) => {
    return state?.auth?.isAuth;
  });

  const isOwner = !params.userId;

  const handleRefreshProfile = useCallback(() => {
    let userId = params.userId;

    dispatch(getUserProfile(Number(userId || authorizedUserId)));
    dispatch(getStatus(Number(userId || authorizedUserId)));
  }, [params.userId, authorizedUserId]);

  useEffect(() => {
    dispatch(getAuthUserData());
  }, []);

  useEffect(() => {
    handleRefreshProfile();
  }, []);

  //TODO: нужны фетчинги
  if (!isAuth) return <Navigate to="/login" />;

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
