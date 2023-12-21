import React from "react";

export default function SearchIcon() {
  return (
    <div className="navbar-nav align-items-center">
      <div className="nav-item navbar-search-wrapper mb-0">
        <a className="nav-item nav-link search-toggler px-0">
          <i className="bx bx-search-alt bx-sm"></i>
          <span className="d-none d-md-inline-block text-muted">
            جستجو (/+Ctrl)
          </span>
        </a>
      </div>
    </div>
  );
}
