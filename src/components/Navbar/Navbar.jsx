import { NavLink } from "react-router";
import { MENU } from "./constants/menu";
// import Friends from "./Friends/Friends";
// import {friendListCreator} from "../../redux/sidebar-reducer";

const Navbar = (props) => {
  return (
    <nav className="flex gap-x-4 items-center">
      {MENU.map((it) => (
        <NavLink key={it.key} to={it.path} className="inline-block">
          {it.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
