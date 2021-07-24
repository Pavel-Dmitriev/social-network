import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 200,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
  // users: [
  //   {id: '1', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Igor Petrov', status: 'I am big BOSS', location: {  city: 'Moscow', country: 'Russia'  } },
  //   {id: '2', followed: true, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Vasya Vasin', status: 'I am big BOSSSSSS', location: {  city: 'Elec', country: 'Russia'  } },
  //   {id: '3', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Pavel Pavlov', status: 'I am big BOSSSSSS', location: {  city: 'London', country: 'England'  } },
  //   {id: '4', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Egor Serov', status: 'I am big BOSS', location: {  city: 'Voronezh', country: 'Russia'  } }
  // ]
}


const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    }
    case UNFOLLOW: {
      return {
        ...state,
       users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    }
    case SET_USERS: {
      return {
        ...state, users: action.users
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state, currentPage: action.currentPage
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state, isFetching: action.isFetching
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state, totalUsersCount: action.count
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }
    }
    default:
      return state
  }
}

//action creators для юзеров

//подписка на юзера
export const followSuccess = (userId) => {
  return {
    type: FOLLOW,
    userId
  }
}

//отписка на юзера
export const unfollowSuccess = (userId) => {
  return {
    type: UNFOLLOW,
    userId
  }
}

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users
  }
}

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}

export const setTotalUsersCount = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  }
}

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  }
}

export const toggleFollowingProgress = (isFetching, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
  }
}

//Используем Thunk для получения юзеров из сервера
export const requestUsers = (page, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))

    usersAPI.getUsers(page, pageSize)
      .then(data => {
        dispatch(toggleIsFetching(false))
        dispatch(setUsers(data.items))
        // dispatch(setTotalUsersCount(data.totalCount))
      });
  }
}
export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
  }
}
export const unfollow = (userId) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
  }
}

export default usersReducer