import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import IntlMessages from "helpers/IntlMessages";
import React from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Breadcrumb from "features/app/components/layout/Breadcrumb";
import { connect } from "react-redux";
import { modalOpen, modalClose } from "redux/actions";
import RelationList from "features/app/main/relation/components/RelationList";

const Index = (props) => {


  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "app.main.cost.home",
          "app.main.cost.relations",
        ]}
      />
      <RelationList />
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  return {};
};

export default injectIntl(
  connect(mapStateToProps, {
    modalOpenAction: modalOpen,
    modalCloseAction: modalClose,
  })(Index)
);
