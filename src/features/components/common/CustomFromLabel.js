import React from "react";
import { Label } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";

const CustomFromLabel = ({ children, intl, label }) => {
  const [labels, setLabels] = React.useState(label.split(","));
  return (
    <Label
      style={{ position: "relative" }}
      className="form-group has-float-label"
    >
      <span className="label2">
        {labels.map((m) => (
          <IntlMessages id={m} />
        ))}
      </span>
      {children}
    </Label>
  );
};
export default injectIntl(CustomFromLabel);
