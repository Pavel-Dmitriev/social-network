//TODO: возможно нужны приписки к константам
export const ADD_POST = "ADD-POST";
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_STATUS = "SET_STATUS";
export const DELETE_POST = "DELETE_POST";
export const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

export const INITIAL_STATE = {
  posts: [
    { id: 1, message: "This is my posts", likesCount: 0 },
    { id: 2, message: "Cool", likesCount: 4 },
  ],
  profile: null,
  status: "",
  newPostText: "",
};
