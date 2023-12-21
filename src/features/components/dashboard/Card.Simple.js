import React from "react";
import { Link } from "react-router-dom";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";

const CardSimple = (props) => {
  const { intl, title, url, className, icon = "invoice", iconClass, onClick, key } = props;
  //console.log(title);
  return (
    <div className={className} onClick={onClick} key={key}>
      <Link to={url}>
        <div className="card">
          <div className="card-body text-center">
            <div className="avatar avatar-md mx-auto mb-3">
              <img src={`/assets/svg/icons/dashboard/${icon}.svg`} />
            </div>
            <span className="d-block mb-1 text-nowrap text-dashboard">
              {title.map((t) => {
                return (<><IntlMessages id={t} />{" "}</>);
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default injectIntl(CardSimple);
