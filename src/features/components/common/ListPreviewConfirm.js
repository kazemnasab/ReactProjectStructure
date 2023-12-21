import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomDataGrid from "features/components/common/CustomDataGrid";
import {
  Row,
} from "reactstrap";
import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SupportedConfirm = (props) => {
  const navigate = useNavigate();
  const { intl, items, onCallBack, columns } = props;
  const { messages } = intl;
  return (
    <>
      <Row>
        <CustomDataGrid
          indexer_width={20}
          rows={items.map((item, index)=>{return {...item, id: index}})}
          columns={columns}
          pagination
          rowsPerPageOptions={[5]}
          pageSize={10}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          {...props}
        />
        <Colxx xxs="12" style={{ text_align: "end" }}>
          <IconButton
            title={messages["submit.change"]}
            onClick={() => {
              onCallBack(true, items);
            }}
          >
            <CheckRoundedIcon color="info" />
          </IconButton>

          <IconButton
            title={messages["cancel.change"]}
            onClick={() => {
              onCallBack(true, null);
            }}
          >
            <CloseRoundedIcon style={{ color: "red" }} />
          </IconButton>
        </Colxx>
      </Row>
    </>
  );
};

export default injectIntl(SupportedConfirm);