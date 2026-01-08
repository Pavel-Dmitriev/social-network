import React from "react";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

import { actions } from "../../store/reducers/dialogs";

// const DialogsContainer = (props) => {
//
//   let state = props.store.getState().dialogsPage
//
//   let onSendMessageClick = () => {
//     props.store.dispatch(sendMessageActionCreator())
//   }
//
//   let onNewMessageChange = (body) => {
//     props.store.dispatch(updateNewMessageBodyActionCreator(body))
//   }
//
//   return (
//    <Dialogs sendMessage={onSendMessageClick}
//             updateNewMessageBody={onNewMessageChange}
//             dialogsPage={state} />
//   )
// }

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageActionCreator(newMessageBody));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
