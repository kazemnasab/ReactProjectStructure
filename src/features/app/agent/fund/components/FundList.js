import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import moment from "jalali-moment";
import { connect } from "react-redux";
import * as RoutSelector from "redux/rout/selector";
import CustomDataGrid from "features/components/common/CustomDataGrid";

const FundList = (props) => {
  const { intl, items, routs } = props;
  const { messages } = intl;
  const columns = [
    {
      field: "name",
      headerName: messages["profile.firstname"],
      width: 150,
      editable: true,
      valueGetter: (params) => {
         return params.row.name + " "+params.row.family;
      },
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
      width: 200,
    },
    {
      field: "routId",
      headerName: messages["donation.fund.rout"],
      width: 170,
      valueGetter: (params) => {
        if (params.row.routId) {
          var cs = routs.find((m) => m.id == params.row.routId);
          if (cs) return cs.title;
        } else return params.row.routId + "";
      },
    },
  ];
  return (
    <>
      <CustomDataGrid
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
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  return {
    routs,
  };
};
export default injectIntl(connect(mapStateToProps, {})(FundList));
