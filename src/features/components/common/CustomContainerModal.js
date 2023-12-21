import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";

const CustomContainerModal = (props) => {
  const { title, isOpen, toggle, children, size, intl } = props;
  const { messages } = intl;
  return (
    <Modal
      {...props}
      title={title ? title.map((m) => messages[m] + " ") : ""}
      backdrop="static"
      size={size}
    >
      {title ? <ModalHeader toggle={toggle}>
        {title.map((m) => (
          <IntlMessages id={m} />
        ))}
      </ModalHeader> : <></>}
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};
export default injectIntl(CustomContainerModal);
