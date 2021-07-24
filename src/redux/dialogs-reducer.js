const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
  //Диалоги в Dialogs.jsx
  dialogsData: [
    {
      name: 'Andrey',
      id: '1',
      avatar: 'https://instaturbo.ru/images/blog/5bbe5b813ffd5.jpg'
    },
    {
      name: 'Pasha',
      id: '2',
      avatar: 'https://download-cs.net/steam/avatars/3065.jpg'
    }
  ],
  //Сообщения в Dialogs.jsx
  messages: [
    {id: '1', message: 'Hi'},
    {id: '2', message: 'How are you'},
    {id: '3', message: 'Goood'}
  ]
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE: {
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, {id: 4, message: body}]
      }
    }
    default:
      return state
  }
}

//action creators для сообщений

export const sendMessageActionCreator = (newMessageBody) => {
  return {
    type: SEND_MESSAGE,
    newMessageBody
  }
}



export default dialogsReducer