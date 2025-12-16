import { profileAPI, usersAPI } from "../../../api";
import { stopSubmit } from "redux-form";
import {
  AddPostActionCreatorType,
  DeletePostActionType,
  InitialStateType,
  ProfileType,
  SavePhotoSuccessActionType,
  SetStatusActionType,
  SetUserProfileActionType,
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

const profileReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: any
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

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  const response = profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    //
  }
};
export const savePhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile =
  (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(
        stopSubmit("edit-profile", { _error: response.data.messages[0] })
      );
      return Promise.reject(response.data.messages[0]);
    }
  };

export default profileReducer;
