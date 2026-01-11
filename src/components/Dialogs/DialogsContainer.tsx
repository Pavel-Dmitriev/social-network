import Dialogs from "../Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

import { actions } from "../../store/reducers/dialogs";
import { AppStateType } from "store/redux-store";

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

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

export default compose(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect
)(Dialogs);
