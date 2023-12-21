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
  const { intl, data, onCallBack } = props;
  const { messages } = intl;
  const columns = [
    {
      field: "name",
      headerName: messages["profile.firstname"],
      width: 80,
      editable: true,
    },{
      field: "family",
      headerName: messages["profile.family"],
      width: 100,
      editable: true,
    },
    {
      field: "number",
      headerName: messages["profile.number"],
      width: 100,
      editable: true,
    },
    {
      field: "birth",
      headerName: messages["profile.birth"],
      width: 100,
      editable: true,
    },
    {
      field: "father",
      headerName: messages["profile.father"],
      width: 110,
      editable: true,
    },
    {
      field: "mobile",
      headerName: messages["profile.mobile"],
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: messages["profile.address"],
      sortable: false,
      width: 300,
    },
  ];
  return (
    <>
      <Row>
        <CustomDataGrid
          indexer_width={20}
          rows={data.map((item, index)=>{return {...item, id: index}})}
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
              onCallBack(true, data);
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

const mapStateToProps = (state) => {
  return {
  };
};
export default injectIntl(connect(mapStateToProps, {})(SupportedConfirm));
