import { usersAPI, profileAPI } from "api";
import { stopSubmit } from "redux-form";
import {
  ActionsTypes,
  AddPostActionCreatorType,
  DeletePostActionType,
  InitialStateType,
  ProfileType,
  SavePhotoSuccessActionType,
  SetStatusActionType,
  SetUserProfileActionType,
  ThunkType,
} from "./types";
import {
  ADD_POST,
  DELETE_STATUS,
  INITIAL_STATE,
  SAVE_PHOTO_SUCCESS,
  SET_STATUS,
  SET_USER_PROFILE,
} from "./constants";
import { PhotosType } from "store/types";
import { AppStateType } from "store/redux-store";

const profileReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: ActionsTypes
) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_STATUS: {
      return {
        ...state,
        posts: action.posts.filter((p: any) => p.id != action.postsId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default:
      return state;
  }
};

//action creators для постов
export const addPostActionCreator = (
  newPostText: string
): AddPostActionCreatorType => {
  return {
    type: ADD_POST,
    newPostText,
  };
};

export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    profile,
  };
};

export const setStatus = (status: string): SetStatusActionType => {
  return {
    type: SET_STATUS,
    status,
  };
};

export const deletePost = (postId: number): DeletePostActionType => {
  return {
    type: DELETE_STATUS,
    postId,
  };
};

export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos,
  };
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
  };
export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    } catch (error) {
      //
    }
  };
export const savePhoto =
  (file: any): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(savePhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState: () => AppStateType) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;
