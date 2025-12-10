import React from "react";
import { NavLink } from "react-router";

import Navbar from "../Navbar";

import { IHeaderProps } from "./interface";

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <header
      style={{ gridArea: "h" }}
      className="relative max-w-289.75 mx-auto rounded-full backdrop-blur-[20px] z-10 p-2 min-h-16.5 h-16.5 flex items-center justify-between bg-white/20"
    >
      <span className="text-2xl text-white">БОЛТАЛКА</span>

      <Navbar />

      <div className="">
        {props.isAuth ? (
          <div>
            {props.login || ""} - <button onClick={props.logout}>Выйти</button>
          </div>
        ) : (
          <span className="text-white">
            Вход в систему: <NavLink to={"/login"}>Login</NavLink>
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
