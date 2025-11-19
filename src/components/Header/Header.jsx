import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  return (
    <header className={s.header}>
      {/* <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' /> */}
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/126/126338.svg"
        alt="social-network"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logout}>Log out</button>
          </div>
        ) : (
          <span className="text-red-500">
            Вход в систему: <NavLink to={"/login"}>Login</NavLink>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
