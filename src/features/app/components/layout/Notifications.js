import React from "react";
import NotificationsItem from "./Notifications.Item";

export default function Notifications() {
  return (
    <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
      <a
        className="nav-link dropdown-toggle hide-arrow"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
      >
        <i className="bx bx-bell bx-sm"></i>
        <span className="badge bg-danger rounded-pill badge-notifications">
          5
        </span>
      </a>
      <ul className="dropdown-menu dropdown-menu-end py-0">
        <li className="dropdown-menu-header border-bottom">
          <div className="dropdown-header d-flex align-items-center py-3">
            <h5 className="text-body mb-0 me-auto secondary-font">اعلان‌ها</h5>
            <a
              className="dropdown-notifications-all text-body"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="علامت خوانده شده به همه"
            >
              <i className="bx fs-4 bx-envelope-open"></i>
            </a>
          </div>
        </li>
        <li className="dropdown-notifications-list scrollable-container">
          <ul className="list-group list-group-flush">
            <NotificationsItem title="" description="کمک جدید" utime={ "۱ ساعت قبل"} className="marked-as-read" />
            <NotificationsItem title="" description="حامی جدید" utime={ "1401/09/12"} className=""/>
            <NotificationsItem title="" description="ثبت کمک" utime={ "1400/12/12"} className=""/>
          </ul>
        </li>
        <li className="dropdown-menu-footer border-top">
          <a className="dropdown-item d-flex justify-content-center p-3">
            مشاهده همه اعلان‌ها
          </a>
        </li>
      </ul>
    </li>
  );
}
