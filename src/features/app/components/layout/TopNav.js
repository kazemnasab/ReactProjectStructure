import React from "react";
import Actions from "./Actions";
import Notifications from "./Notifications";
import Profile from "./Profile";
import SearchIcon from "./SearchIcon";
import Shortcuts from "./Shortcuts";
import Search from "./Search";
import { injectIntl } from "react-intl";
import { getCurrentUser } from "helpers/Utils";

const TopNav = ({ intl }) => {
  const currentUser = getCurrentUser();
  const { messages } = intl;
  return (
    <nav
      className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="container-fluid">
        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          <SearchIcon />
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <Actions />
            <li className="nav-item me-2 me-xl-0">
              <a className="nav-link style-switcher-toggle hide-arrow">
                <i className="bx bx-sm"></i>
              </a>
            </li>
            {currentUser && currentUser.app == "main" ? <Shortcuts /> : <></>}
            <Notifications />
            <Profile />
          </ul>
        </div>
        <Search />
      </div>
    </nav>
  );
};
export default injectIntl(TopNav);
