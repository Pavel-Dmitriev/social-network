import React from "react";
// import { NavLink } from 'react-router-dom';
import s from "./Friends.module.css";
import FriendItem from "../FriendItem/FriendItem";
// import {friendListCreator} from "../../../redux/sidebar-reducer";

const Friends = (props) => {
  let friendsElements = props.friends.map((f) => (
    <FriendItem name={f.name} id={f.id} avatar={f.avatar} />
  ));

  return <div className={s.friendsBlock}>{friendsElements}</div>;
};

export default Friends;
