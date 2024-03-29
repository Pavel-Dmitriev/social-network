import {profileAPI, usersAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_STATUS = 'DELETE_STATUS'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    {id: '1', message: 'This is my posts', likesCount: 0},
    {id: '2', message: 'Cool', likesCount: 4}
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 0
      }
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case DELETE_STATUS: {
      return {
        ...state,
        posts: action.posts.filter(p => p.id != action.postsId)
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    default:
      return state
  }
}

//action creators для постов

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST,
    newPostText
  }
}
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}
export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    status
  }
}
export const deletePost = (postsId) => {
  return {
    type: DELETE_STATUS,
    postsId
  }
}
export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos
  }
}

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  const response = profileAPI.getStatus(userId)
  dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    //
  }
}
export const savePhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId
  const response = await profileAPI.saveProfile(profile)

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
  }
}

export default profileReducer