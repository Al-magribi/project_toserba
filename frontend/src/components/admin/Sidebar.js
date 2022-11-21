import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { sidebarData } from "./SidebarData";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const showHandler = () => setShow(true);
  const closeHandler = () => setShow(false);
  return (
    <div className="sidebar-Wrapper">
      <div className="siderbar">
        <div>
          <Link to="#">
            <FaIcons.FaBars onClick={showHandler} />
          </Link>
        </div>
        <nav className={show ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <AiIcons.AiOutlineClose onClick={closeHandler} />
            </li>
            {sidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon} <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
