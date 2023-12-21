import React from "react";
import { Spinner } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";

const CustomButton = ({
  intl,
  label,
  btnClass="",
  iconClass,
  loading,
  onClick,
  child,
  width,
  style={},
  type
}) => {
  return (
    <button
      class={`btn btn-${btnClass}`}
      data-repeater-delete
      onClick={onClick}
      type={type}
      style={{...style, width: width}}
    >
      {loading ? (
        <Spinner color="#FFF" size="sm">
          <IntlMessages id="submit.loading" />
        </Spinner>
      ) : (
        <>
          {iconClass ? <i class={`bx bx-${iconClass}`}></i> : <></>}
          {child ? child : <></>}
          {" "}
          <span class="align-middle">
            {label ? <IntlMessages id={label} /> : <></>}
          </span>
        </>
      )}
    </button>
  );
};
export default injectIntl(CustomButton);
