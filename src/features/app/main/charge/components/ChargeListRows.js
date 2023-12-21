import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomDataGrid from "features/components/common/CustomDataGrid";

const ChargeListRows = (props) => {
  const { intl, items } = props;
  const { messages } = intl;
  React.useEffect(()=>{
    console.log(items);
  },[]);
  const columns = [
    {
      field: "reg",
      headerName: messages["reg.or.city"],
      width: 150,
      valueGetter: (params) => {
        return params.row.supported.relation.reg;
      },
    },{
      field: "relation",
      headerName: messages["app.main.cost.relation"],
      width: 130,
      valueGetter: (params) => {
        return params.row.supported.relation.relation;
      },
    },{
      field: "name",
      headerName: messages["profile.firstname"],
      width: 150,
      valueGetter: (params) => {
        return params.row.supported.supported.name + " " + params.row.supported.supported.family;
      },
    },
    {
      field: "number",
      headerName: messages["profile.number"],
      width: 100,
      valueGetter: (params) => {
        return params.row.supported.supported.number ;
      },
    },
    {
      field: "price",
      headerName: messages["app.main.cost.charge.price"],
      width: 90,
      type: "number",
      valueGetter: (params) => {
        return params.row.charge.price ;
      },
    },{
      field: "countMember",
      headerName: messages["profile.countMember1"],
      width: 50,
      valueGetter: (params) => {
        return params.row.supported.supported.countMember ;
      },
    },
    {
      field: "bankNumber",
      headerName: messages["profile.bankNumber"],
      width: 150,
      valueGetter: (params) => {
        return params.row.supported.supported.bankNumber ;
      },
    },
  ];
  return (
    <>
      <CustomDataGrid
        indexer_width={20}
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
export default injectIntl(connect(mapStateToProps, {})(ChargeListRows));
