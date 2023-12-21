import React from "react";
import { injectIntl } from "react-intl";

const Breadcrumb = ({ intl, breadcrumb }) => {
  const { messages } = intl;
  return (
    <h5 className="py-3 breadcrumb-wrapper mb-0">
      <span className="text-muted fw-light">
        {breadcrumb.map((br, index) => {
          return index < breadcrumb.length - 1
            ? messages[breadcrumb[index]] + "/"
            : "";
        })}
      </span>{" "}
      {messages[breadcrumb[breadcrumb.length - 1]]}
    </h5>
  );
};
export default injectIntl(Breadcrumb);
