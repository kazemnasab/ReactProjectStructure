import React from "react";
import { Link } from "react-router-dom";
import IntlMessages from 'helpers/IntlMessages'
import { injectIntl } from "react-intl";

const CardStatistic = ({ intl, title, url, className, icon, iconClass }) => {
  return (
    <div className={className}>
      <Link to={url}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="avatar">
                  <span className={`avatar-initial rounded-circle ${iconClass ? iconClass : "bg-label-info"
                    }`}>
                    <i className={`${icon} fs-4`}></i>
                  </span>
                </div>
                <div className="card-info">
                  <h5 className="card-title mb-0 me-2 primary-font">
                    12,452
                  </h5>
                  <small className="text-muted">
                    <IntlMessages id={title} />
                  </small>
                </div>
              </div>
              <div id="profitChart"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default injectIntl(CardStatistic);
