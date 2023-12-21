import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import React from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "features/repositories/methods";
import { BakerSupportedChargeApi, BakerRelationApi } from "../../repositories";
import { ConstantApi } from "features/repositories";
import { DialogContext } from "providers/context/contexts";
import { connect } from "react-redux";
import * as Region1Selector from "redux/region1/selector";
import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GetAppIcon from "@mui/icons-material/GetApp";
import List from "./ChargeListRows";
import { getCurrentUser } from "helpers/Utils";
import ExcelImport from "features/components/common/ExcelImport";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import { supportedChargeExcelExport } from "features/app/main/columns/supported";
import { exportToCSV } from "helpers/excelUtility";
import { useQuery } from "react-query";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import Loading from "react-fullscreen-loading";
import IntlMessages from "helpers/IntlMessages";
import {
  ErrorDialog,
  SuccessSaveAlert,
  ConfirmDelete,
} from "features/components/common/AlertDialog";

var rowstyles = {
  width: "100%",
  "& .super-app-theme--0": {
    color: "#AA2323",
  },
  "& .super-app-theme--1": {
    color: "#1923ad",
  },
  "& .super-app-theme--5": {
    color: "#186200",
  }, "& .super-app-theme--50": {
    color: "#186200",
  },
  "& .super-app-theme--131": {
    color: "#812d2d",
  },
  "& .super-app-theme--13": {
    color: "#812d2d",
  },"& .super-app-theme--130": {
    color: "#812d2d",
  },
  "& .super-app-theme--132": {
    color: "#812d2d",
  },
  "& .super-app-theme--133": {
    color: "#812d2d",
  },
  "& .super-app-theme--10": {
    bgcolor: "#00D6D6",
    "&:hover": {
      bgcolor: "#FFF",
    },
  },
};

const ChargeList = (props) => {
  const { pageCloseDialogAction, pageOpenDialogAction} =
    React.useContext(DialogContext);
  const { intl, region1s, states = null, documentId } = props;
  const [searchFilter, setSearchFilter] = React.useState({
    states: states,
    documentIds: documentId ? [documentId] : [],
  });
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  React.useEffect(() => {
    //console.log(searchFilter);
    if (!searchFilter) openSearchDialog();
  }, []);
  const currentUser = getCurrentUser();
  const { messages } = intl;
  const loadSupporteds = useApiMyCustomFetch(
    searchFilter && BakerSupportedChargeApi.Search(searchFilter),
    searchFilter
  );
  const {
    data: relations,
    isLoading: isLoadingRelations,
    error: errorRelations,
  } = useQuery(
    "Relations",
    () =>
      BakerRelationApi.Get({ target: "Donation2", stateId: 5 })
        .apply()
        .then((res) => {
          return [
            ...res.data.map((item) => {
              var reg = region1s.find((m) => m.id == item.reg1Id);
              return {
                label: item.name + " - " + (reg ? reg.code : ""),
                value: item.id,
                key: item.id,
              };
            }),
          ];
        }),
    {}
  );
  const {
    data: bakerSupportedStates,
    isLoading: isLoadingBakerSupportedState,
    error: errorBakerSupportedState,
  } = useQuery(
    "BakerSupportedState",
    () =>
      ConstantApi.Get({ target: "BakerSupportedState" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return {
              label: item.title,
              value: item.id,
            };
          });
        }),
    {}
  );
  const [items, dispatchSupportedItems] = useCustomListReducer({
    initialArg: loadSupporteds.data,
    key: currentUser.id,
  });

  const onCallBackSupportedExcelImport = (close, res) => {
    if (close) pageCloseDialogAction({ page: "SupportedExcelImport" });
    ////console.log(res);
    if (res)
      setSearchFilter(
        searchFilter
          ? {
              ...searchFilter,
              key: searchFilter.key ? searchFilter.key + 1 : 1,
            }
          : { key: 1 }
      );
    ////console.log(res.data.data);
    if (res && res.data && res.data.data && res.data.data.length) {
      exportToCSV(
        "تکراری",
        res.data.data.map((m) => {
          return {
            ...m.charge,
            ...m.supported.supported,
            relation: m.supported.relation.relation,
            reg: m.supported.relation.reg,
          };
        }),
        supportedChargeExcelExport
      );
    }
  };
  const openGroupEdit = () => {};

  const openChargeAction = () => {};

  const openSupportedExcelImport = (stateId) => {
    const child = (
      <ExcelImport
        defaultCols={["", "name", "family", "number", "birth", "bankNumber"]}
        dataFields={supportedChargeExcelExport}
        groupActions={[
          {
            field: "bakerRelationId",
            label: "app.main.cost.relation",
            md: 4,
            lg: 4,
            options: isLoadingRelations ? [] : relations,
          },
          {
            field: "stateId",
            label: "profile.state",
            md: 2,
            lg: 2,
            options: isLoadingBakerSupportedState ? [] : bakerSupportedStates,
          },
        ]}
        onCallBack={onCallBackSupportedExcelImport}
        title="app.main.cost.supported"
        postData={saveExcelSheet(stateId)}
        filterData={(filter) => {
          setSearchFilter(filter);
        }}
        startColIndex={1}
      />
    );
    pageOpenDialogAction({
      page: "SupportedExcelImport",
      title: ["app.main.cost.supported"],
      size: "xl",
      child: child,
    });
  };

  const saveExcelSheet = (stateId) => {
    return async (data) => {
      return await BakerSupportedChargeApi.PatchList(data).apply();
    };
  };

  const openSearchDialog = () => {};

  const updateGroup = (fields) => {
    BakerSupportedChargeApi.PatchList(
      selectedIds.map((m) => {
        return {
          id: m,
          ...fields,
        };
      }),
      0
    )
      .apply()
      .then((m) => {
        setIsSaving(false);
        setSearchFilter(
          searchFilter
            ? {
                ...searchFilter,
                key: searchFilter.key ? searchFilter.key + 1 : 1,
              }
            : { key: 1 }
        );
      });
  };

  const openSupported = (supported) => {};
  return (
    <div>
      <Loading
        loading={isSaving}
        background="radial-gradient(rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.1))"
        loaderColor="#3498db"
      />
      <Row className="mb-4">
        <Colxx sm="12" md="12" lg="12" color="success">
          <IconButton
            size="large"
            onClick={() => {
              exportToCSV(
                "لیست شارژ",
                items.map((item) => {
                  return {
                    ...item.charge,
                    ...item.supported.supported,
                    ...item.supported.relation,
                    reg: item.supported.relation.reg,
                  };
                }),
                supportedChargeExcelExport
              );
            }}
            title={messages["export.excel"]}
          >
            <GetAppIcon color="info" fontSize="larg" />
          </IconButton>
          {selectedIds.length > 0 && (
            <>
              {"  "}
              <IconButton
                size="large"
                title={messages["delete"]}
                onClick={() => {
                  ConfirmDelete({
                    okClick: () => {
                      setIsSaving(true);
                      updateGroup({ stateId: 0 });
                    },
                  });
                }}
              >
                <DeleteSweepRoundedIcon
                  style={{ color: "#df8181" }}
                  fontSize="larg"
                />
              </IconButton>
            </>
          )}
        </Colxx>
      </Row>
      <List
        rowstyles={rowstyles}
        dispatchItemChange={dispatchSupportedItems}
        items={items}
        loading={searchFilter && loadSupporteds.isLoading}
        onRowDoubleClick={(item) => {
          openSupported(item.supported);
        }}
        onSelectionModelChange={(ids) => {
          setSelectedIds(ids);
        }}
        getRowClassName={(params) =>
          `super-app-theme--${params.row.charge.stateId}`
        }
      />
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return { region1s };
};

export default injectIntl(connect(mapStateToProps, {})(ChargeList));
