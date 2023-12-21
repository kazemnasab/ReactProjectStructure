import React from "react";
import { Link } from "react-router-dom";

export default function Index({ title, description, url, iconClass, SvgIcon }) {
  return (
    <div className="dropdown-shortcuts-item col">
      <Link to={`${url}`} target={"_blank"}>
        <span className="dropdown-shortcuts-icon bg-label-secondary rounded-circle mb-2">
          <img src={SvgIcon} fill='red'  alt="Your SVG" className="fs-4" style={{"width":"1.375rem"}} />
        </span>
        <div>{title}</div>
        <small className="text-muted mb-0">{description}</small>
      </Link>
    </div>
  );
}
