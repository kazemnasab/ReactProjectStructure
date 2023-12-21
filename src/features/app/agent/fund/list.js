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
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "features/repositories/methods";
import { FundApi } from "../repositories";
import Breadcrumb from "features/app/components/layout/Breadcrumb";
import { connect } from "react-redux";
import { modalOpen, modalClose } from "redux/actions";
import { IconButton } from "@mui/material";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import GetAppIcon from '@mui/icons-material/GetApp';
import FundList from "features/app/agent/fund/components/FundList";
import { getCurrentUser } from "helpers/Utils";

const Index = (props) => {
  const currentUser = getCurrentUser();
  const {
    intl,
    modalOpenAction,
    modalCloseAction,
  } = props;
  const { messages } = intl;
  const loadFunds = useApiMyCustomFetch(
    FundApi.Get({ agentId: currentUser.id }),
    currentUser.id
  );

  const [items, dispatchFundItems] = useCustomListReducer({
    initialArg: loadFunds.data,
    key: currentUser.id,
  });

  const openFund = React.useCallback(
    (fund) => {
      modalOpenAction({
        page: "FundRegister",
        title: ["app.donation.fund.new"],
        size: "md",
        fund: fund,
        onCallBack: (close, res) => {
          if (res)
            dispatchFundItems({
              type: "edit",
              new: res,
              prev: fund,
              index: "insert",
            });
          if (close)
            modalCloseAction();
        },
      });
    },
    []
  );

  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "app.donation.home",
          "app.donation.list",
        ]}
      />
      <Card>
        <CardBody>
          <Row className="mb-4">
            <Colxx sm="12" md="2" lg="2" color="success">
              <IconButton size="large" onClick={() => {
                openFund(null);
              }} title={messages["app.saleservice.fund.new"]}>
                <AddOutlinedIcon color="info" fontSize="larg" />
              </IconButton>
              {""}
              <IconButton size="large" onClick={() => {
                openFund(null);
              }} title={messages["agroup.action"]}>
                <FactCheckIcon color="info" fontSize="larg" />
              </IconButton>
              {""}
              <IconButton size="large" onClick={() => {
                openFund(null);
              }} title={messages["export.excel"]}>
                <GetAppIcon color="info" fontSize="larg" />
              </IconButton>

            </Colxx>
          </Row>
          <FundList
            dispatchItemChange={dispatchFundItems}
            items={items}
            loading={loadFunds.isLoading}
            onRowDoubleClick={(item) => {
              openFund(item);
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  return {
  };
};

export default injectIntl(
  connect(mapStateToProps, {
    modalOpenAction: modalOpen,
    modalCloseAction: modalClose,
  })(Index)
);