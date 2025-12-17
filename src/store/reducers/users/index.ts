import { usersAPI } from "../../../api";
import { updateObjectInArray } from "../../../utils/object-helpers";
import {
  FOLLOW,
  INITIAL_STATE,
  SET_CURRENT_PAGE,
  SET_TOTAL_USERS_COUNT,
  SET_USERS,
  TOGGLE_IS_FETCHING,
  TOGGLE_IS_FOLLOWING_PROGRESS,
  UNFOLLOW,
} from "./constants";
import {
  ActionsTypes,
  DispatchType,
  FollowSuccessActionType,
  InitialStateType,
  SetCurrentPageActionType,
  SetTotalUsersCountActionType,
  SetUsersActionType,
  ThunkType,
  ToggleFollowingProgressActionType,
  ToggleisFetchingActionType,
  UnfollowSuccessActionType,
  UserType,
} from "./types";

const usersReducer = (
  state: InitialStateType = INITIAL_STATE,
  action: ActionsTypes
) => {
  switch (action.type) {
    case FOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case UNFOLLOW: {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

//action creators для юзеров

//подписка на юзера
export const followSuccess = (userId: number): FollowSuccessActionType => {
  return {
    type: FOLLOW,
    userId,
  };
};

//отписка на юзера
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
  return {
    type: UNFOLLOW,
    userId,
  };
};

export const setUsers = (users: UserType[]): SetUsersActionType => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setCurrentPage = (
  currentPage: number
): SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalUsersCount = (
  totalUsersCount: number
): SetTotalUsersCountActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};

export const toggleIsFetching = (
  isFetching: boolean
): ToggleisFetchingActionType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const toggleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ToggleFollowingProgressActionType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  };
};

//Используем Thunk для получения юзеров из сервера
export const requestUsers = (page: number, pageSize: number): ThunkType => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    usersAPI.getUsers(page, pageSize).then((data: any) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      // dispatch(setTotalUsersCount(data.totalCount))
    });
  };
};

export const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (
    userId: number
  ) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;
