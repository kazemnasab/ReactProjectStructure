import * as React from "react";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import CustomDataGrid from "features/components/common/CustomDataGrid";
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch } from "features/repositories/methods";
import { BakerSupportedApi } from "../../repositories";
import { DialogContext } from "providers/context/contexts";
import { useLocation } from 'react-router-dom';


function SupportedLog(props) {
  const location = useLocation();

  const { intl, supportedId = 0, height = 600 } = props;
  const { pageOpenDialogAction, pageCloseDialogAction } =
    React.useContext(DialogContext);
  const { messages } = intl;
  const [deletingItem, setDeletingItem] = React.useState(null);

  const loadSupportedLog = useApiMyCustomFetch(
    supportedId
      ? BakerSupportedApi.Log(supportedId)
      : null,
    supportedId ? supportedId : -1
  );

  const [logItems, dispatchSupportedLog] = useCustomListReducer({
    initialArg: loadSupportedLog.data,
    key: supportedId ? supportedId : -1,
  });
  var prevRem = 0;

  const columns = [
    {
      field: "uuser",
      headerName: messages["uuser"],
      width: 130,
      editable: true,
    }, {
      field: "utime",
      headerName: messages["utime"],
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: messages["title"],
      width: 120,
    },
    {
      field: "prevValueTitle",
      headerName: messages["from"],
      width: 220,
    },
    {
      field: "newValueTitle",
      headerName: messages["to"],
      width: 220,
    },
  ];

  return (
    <>

      <CustomDataGrid
        height={height}
        indexer_width={25}
        rows={logItems.sort((a,b) => (a.utime > b.utime) ? -1 : ((b.utime > a.utime) ? 1 : 0))}
        columns={columns}
        pagination
        onRowDoubleClick={(item) => {
          window.open(
            `${location.pathname}/log/${item.id}`, "_blank");
        }}
        rowsPerPageOptions={[5]}
        pageSize={20}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        {...props}
        loading={loadSupportedLog.isLoading}
        getRowClassName={(params) => `super-app-theme--${params.row.stateId}`}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {};
};

export default injectIntl(connect(mapStateToProps, {})(SupportedLog));
