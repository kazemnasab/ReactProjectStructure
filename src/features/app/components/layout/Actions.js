import React from "react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
      >
        <i className="bx bx-plus fs-3 me-1"></i>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" to="donation/new">
          <i className="bx bx-git-pull-request fs-3 me-1"></i>
            <span className="align-middle">رسید جدید</span>
          </Link>
        </li>
      </ul>
    </li>
  );
}
