import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomDataGrid from "features/components/common/CustomDataGrid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import { DialogContext } from "providers/context/contexts";
import SupportedLog from "./SupportedLog";

const List = (props) => {
  const { pageOpenDialogAction, pageCloseDialogAction } =
  React.useContext(DialogContext);
  const { intl, items } = props;
  const { messages } = intl;
  const columns = [
    {
      field: "reg",
      headerName: messages["reg.or.city"],
      width: 150,
      valueGetter: (params) => {
        return params.row.relation.reg;
      },
    },{
      field: "relation",
      headerName: messages["app.main.cost.relation"],
      width: 130,
      valueGetter: (params) => {
        return params.row.relation.relation;
      },
    },{
      field: "name",
      headerName: messages["profile.firstname"],
      width: 150,
      valueGetter: (params) => {
        return params.row.supported.name + " " + params.row.supported.family;
      },
    },
    {
      field: "number",
      headerName: messages["profile.number"],
      width: 100,
      valueGetter: (params) => {
        return params.row.supported.number ;
      },
    },
    {
      field: "birth",
      headerName: messages["profile.birth"],
      width: 90,
      valueGetter: (params) => {
        return params.row.supported.birth ;
      },
    },{
      field: "mobile",
      headerName: messages["profile.mobile"],
      width: 100,
      valueGetter: (params) => {
        return params.row.supported.mobile ;
      },
    },
    {
      field: "bankNumber",
      headerName: messages["profile.bankNumber"],
      sortable: false,
      width: 150,
      valueGetter: (params) => {
        return params.row.supported.bankNumber ;
      },
    },
    {
      field: "utime",
      headerName: messages["submit.date"],
      sortable: false,
      width: 90,
      valueGetter: (params) => {
        return params.row.supported.utime.substring(0, 10);
      },
    },
    {
      field: "log",
      type: "actions",
      width: 40,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<AssessmentRoundedIcon color="info" />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              pageOpenDialogAction({
                page: "SupportedLog",
                title: ["app.main.cost.supported"],
                size: "xl",
                child: <SupportedLog supportedId={params.row.id} />,
                onCallBack: (close, res) => {
                  if (close) {
                    pageCloseDialogAction({
                      page: "SupportedLog",
                    });
                  }
                },
              });
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];
  return (
    <>
      <CustomDataGrid
        indexer_width={70}
        rows={items ?? []}
        columns={columns}
        pagination
        rowsPerPageOptions={[5]}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        {...props}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};
export default injectIntl(connect(mapStateToProps, {})(List));
