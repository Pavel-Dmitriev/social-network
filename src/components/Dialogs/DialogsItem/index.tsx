import React from "react";

import { IDialogItem } from "../interfaces/IDialogItem";
import { NavLink } from "react-router";

const DialogItem: React.FC<IDialogItem> = (props) => {
  return (
    <div>
      <img src={props.avatar} />
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
