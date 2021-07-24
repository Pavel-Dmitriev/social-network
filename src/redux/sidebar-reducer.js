let FRIEND_LIST = 'FRIEND-LIST'

let initialState = {
  friends: [
    {name: 'Oleg', id: '1', avatar: 'https://download-cs.net/steam/avatars/3121.jpg'},
    {name: 'Igor', id: '2', avatar: 'https://download-cs.net/steam/avatars/3202.jpg'},
    {name: 'Vasya', id: '3', avatar: 'https://download-cs.net/steam/avatars/3150.jpg'}
  ]
}

const sidebarReducer = (state = initialState, action) => {

      return state

}

// export const friendListCreator = () => {
//   return {
//     type: FRIEND_LIST
//   }
// }

export default sidebarReducer