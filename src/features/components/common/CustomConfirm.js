import React from "react";
import { Row, Card, CardBody, Input, Label, Button } from "reactstrap";
import Error from "@mui/icons-material/Error";
import IntlMessages from "helpers/IntlMessages";
import { injectIntl } from "react-intl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const CustomConfirm = ({
  isOpen,
  handleOnConfirmOk,
  handleOnConfirmClose,
  colorCancel = "danger",
  colorOk = "info",
  title,
}) => {
  React.useEffect(() => {}, [isOpen]);
  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={handleOnConfirmClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        <Error style={{ color: "red" }} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <IntlMessages id={title} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color={colorOk} onClick={handleOnConfirmOk}>
          <IntlMessages id="ok" />
        </Button>
        {"  "}
        <Button color={colorCancel} onClick={handleOnConfirmClose}>
          <IntlMessages id="cancel" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default injectIntl(CustomConfirm);
