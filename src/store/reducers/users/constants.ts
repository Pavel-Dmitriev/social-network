import { InitialStateType } from "./types";

export const INITIAL_STATE: InitialStateType = {
  users: [],
  pageSize: 10,
  totalUsersCount: 200,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  // users: [
  //   {id: '1', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Igor Petrov', status: 'I am big BOSS', location: {  city: 'Moscow', country: 'Russia'  } },
  //   {id: '2', followed: true, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Vasya Vasin', status: 'I am big BOSSSSSS', location: {  city: 'Elec', country: 'Russia'  } },
  //   {id: '3', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Pavel Pavlov', status: 'I am big BOSSSSSS', location: {  city: 'London', country: 'England'  } },
  //   {id: '4', followed: false, photoUrl: 'http://archilab.online/images/1/123.jpg' , fullName: 'Egor Serov', status: 'I am big BOSS', location: {  city: 'Voronezh', country: 'Russia'  } }
  // ]
};
