import { NavLink } from "react-router";

// import {friendListCreator} from "../../redux/sidebar-reducer";

import { MENU } from "./constants/menu";

const Navbar: React.FC = () => {
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
