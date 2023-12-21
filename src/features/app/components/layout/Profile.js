import React from "react";
import { injectIntl } from "react-intl";
import { getCurrentUser } from 'helpers/Utils'

const Profile = ({ intl }) => {
  const currentUser = getCurrentUser();
  const { messages } = intl;
  React.useEffect(() => {
    console.log(currentUser);
  }, []);
  return (
    <li className="nav-item navbar-dropdown dropdown-user dropdown">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
      >
        <div className="avatar avatar-online">
          <div className="rounded-circle bx bx-user" />
        </div>
      </a>
      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <a
            className="dropdown-item"
            href="pages-account-settings-account.html"
          >
            <div className="d-flex">
              <div className="flex-shrink-0 me-3">
                <div className="avatar avatar-online mt-1">
                  <div className="rounded-circle bx bx-user" />
                </div>
              </div>
              <div className="flex-grow-1">
                <span className="fw-semibold d-block">{(currentUser.name ?? currentUser.firstName + ' ' + currentUser.lastName)
                +(currentUser.comment ?" ("+currentUser.comment+")" : "")}</span>
                <small>{currentUser.roleTitle}</small>
              </div>
            </div>
          </a>
        </li>
        <li>
          <div className="dropdown-divider"></div>
        </li>

        <li>
          <a
            className="dropdown-item"
            href="/app/profile/changepass"
          >
            <i className="bx bx-cog me-2"></i>
            <span className="align-middle">تغییر رمز عبور</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="/user"
          >
            <i className="bx bx-power-off me-2"></i>
            <span className="align-middle">خروج</span>
          </a>
        </li>
      </ul>
    </li>
  );
};
export default injectIntl(Profile);
