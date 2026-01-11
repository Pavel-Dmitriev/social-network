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
  DELETE_POST,
  INITIAL_STATE,
  SAVE_PHOTO_SUCCESS,
  SET_STATUS,
  SET_USER_PROFILE,
} from "./constants";
import { PhotosType } from "store/types";

const profileReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newId =
        state.posts.length > 0
          ? Math.max(...state.posts.map((p) => p.id)) + 1
          : 1;
      let newPost = {
        id: newId,
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
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string): AddPostActionCreatorType =>
    ({
      type: ADD_POST,
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType): SetUserProfileActionType =>
    ({
      type: SET_USER_PROFILE,
      profile,
    } as const),
  setStatus: (status: string): SetStatusActionType =>
    ({
      type: SET_STATUS,
      status,
    } as const),
  deletePost: (postId: number): DeletePostActionType =>
    ({
      type: DELETE_POST,
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType): SavePhotoSuccessActionType =>
    ({
      type: SAVE_PHOTO_SUCCESS,
      photos,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await usersAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
  };
export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    try {
      const data = await profileAPI.updateStatus(status);
      if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
      }
    } catch (error) {
      //
    }
  };
export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };
export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
      dispatch(getUserProfile(userId!));
    } else {
      dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    }
  };

export default profileReducer;
