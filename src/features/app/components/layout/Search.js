import React from "react";

export default function Search() {
  return (
    <div className="navbar-search-wrapper search-input-wrapper d-none">
      <input
        type="text"
        className="form-control search-input container-fluid border-0"
        placeholder="جستجو ..."
        aria-label="Search..."
      />
      <i className="bx bx-x bx-sm search-toggler cursor-pointer"></i>
    </div>
  );
}
