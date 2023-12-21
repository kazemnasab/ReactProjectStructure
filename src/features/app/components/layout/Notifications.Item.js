import React from "react";
import { injectIntl } from "react-intl";

const NotificationItem = ({ intl , title, description, utime, className}) => {
  return (
    <li className={`list-group-item list-group-item-action dropdown-notifications-item‍‍ ${className}`}>
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h6 className="mb-1">{title}</h6>
                  <p className="mb-1">
                    {description}
                  </p>
                  <small className="text-muted">{utime}</small>
                </div>
                <div className="flex-shrink-0 dropdown-notifications-actions">
                  <a className="dropdown-notifications-read">
                    <span className="badge badge-dot"></span>
                  </a>
                  <a className="dropdown-notifications-archive">
                    <span className="bx bx-x"></span>
                  </a>
                </div>
              </div>
            </li>
  );
}

export default injectIntl(NotificationItem);
