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
import { BakerSupportedApi, BakerRelationApi} from "../../repositories";
import { ConstantApi } from "features/repositories";
import { DialogContext } from "providers/context/contexts";
import { connect } from "react-redux";
import * as Region1Selector from "redux/region1/selector";
import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import GetAppIcon from "@mui/icons-material/GetApp";
import PollIcon from '@mui/icons-material/Poll';
import List from "./List";
import { getCurrentUser } from "helpers/Utils";
import ExcelImport from "features/components/common/ExcelImport";
import SyncAltRoundedIcon from "@mui/icons-material/SyncAltRounded";
import { exportToCSV } from "helpers/excelUtility";
import SearchDialog from "./SearchDialog";
import { useQuery } from "react-query";
import BorderAllRoundedIcon from "@mui/icons-material/BorderAllRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import PlaylistAddCheckRoundedIcon from "@mui/icons-material/PlaylistAddCheckRounded";
import Loading from "react-fullscreen-loading";
import IntlMessages from "helpers/IntlMessages";
import GroupAction from "./GroupAction";
import {
  ErrorDialog,
  SuccessSaveAlert,
  ConfirmDelete,
} from "features/components/common/AlertDialog";
import SupportedRegister from "./SupportedRegister";
import ChargeAction from "./ChargeAction";
import { supportedImportExcelFields } from "features/app/main/columns/supported";

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
  },
  "& .super-app-theme--131": {
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

const SupportedList = (props) => {
  const { pageCloseDialogAction, pageOpenDialogAction } =
    React.useContext(DialogContext);
  const { intl, region1s, relationId = null, cardexId = null } = props;
  const [searchFilter, setSearchFilter] = React.useState(
    relationId ? { relations: [relationId] } : (cardexId ? { cardexId: cardexId } : null)
  );
  const [isMenuNew, setIsMenuNew] = React.useState(false);
  const [isMenuGroup, setIsMenuGroup] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState([]);
  const [selectedItems, setSelectedItems] = React.useState([]);
  React.useEffect(() => {
    if (!searchFilter) openSearchDialog();
  }, []);
  const currentUser = getCurrentUser();
  const { messages } = intl;
  const loadSupporteds = useApiMyCustomFetch(
    searchFilter &&
    BakerSupportedApi.Report(
      relationId
        ? { ...searchFilter, relationFilter: { ids: [relationId] } }
        : searchFilter
    ),
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
    //console.log(res);
    if (res)
      setSearchFilter(
        searchFilter
          ? {
            ...searchFilter,
            key: searchFilter.key ? searchFilter.key + 1 : 1,
          }
          : { key: 1 }
      );
    //console.log(res.data.data);
    if (res && res.data && res.data.data && res.data.data.length) {
      exportToCSV(
        "تکراری",
        res.data.data.map((m) => {
          return {
            ...m.supported,
            relation: m.relation.relation,
            reg: m.relation.reg,
          };
        }),
        supportedImportExcelFields
      );
    }
  };
  const openGroupEdit = () => {
    pageOpenDialogAction({
      page: "openGroupEdit",
      title: ["group.edit"],
      size: "md",
      child: <GroupAction />,
      onCallBack: (close, res) => {
        if (res) updateGroup(res);
        pageCloseDialogAction({ page: "openGroupEdit" });
      },
    });
  };

  const openChargeAction = () => {
    pageOpenDialogAction({
      page: "openChargeAction",
      title: ["app.main.cost.charge.req"],
      size: "md",
      child: (
        <ChargeAction
          items={selectedIds.map((id) => {
            const sp = items.find((m) => m.id == id);
            return {
              bakerSupportedId: sp.supported.id,
              bakerRelationId: sp.supported.bakerRelationId,
              countMember: sp.supported.countMember,
              trackNumber: sp.supported.number,
            };
          })}
        />
      ),
      onCallBack: (close, res) => {
        if (res) updateGroup(res);
        pageCloseDialogAction({ page: "openChargeAction" });
      },
    });
  };

  const openSupportedExcelImport = (stateId) => {
    const child = (
      <ExcelImport
        defaultCols={["", "name", "family", "number", "birth", "bankNumber"]}
        dataFields={supportedImportExcelFields}
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
      if (relationId) {
        data = data.map((item) => {
          return {
            ...item,
            stateId: data.stateId ?? stateId,
            bakerRelationId: data.bakerRelationId ?? parseInt(relationId),
            mobile: item.mobile ? item.mobile.toString() : null,
            number: parseFloat(item.number.toString()),
          };
        });
        return await BakerSupportedApi.PostList(data).apply();
      }
      data = data.map((item) => {
        return {
          ...item,
          number: parseFloat(item.number.toString()),
        };
      });
      return await BakerSupportedApi.PatchList(data).apply();
    };
  };

  const openSearchDialog = () => {
    pageOpenDialogAction({
      page: "SupportedSearchDialog",
      title: ["app.main.cost.supported.search.title"],
      size: "md",
      child: <SearchDialog item={searchFilter} />,
      onCallBack: (close, res) => {
        console.log(res);
        if (res) setSearchFilter(res);
        pageCloseDialogAction({ page: "SupportedSearchDialog" });
      },
    });
  };

  const updateGroup = (fields) => {
    BakerSupportedApi.PatchList(
      selectedIds.map((m) => {
        return {
          id: m,
          ...fields,
        };
      })
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

  const openSupported = (supported) => {
    pageOpenDialogAction({
      page: "SupportedRegister",
      title: ["app.main.cost.supported"],
      size: "md",
      child: (
        <SupportedRegister relationId={relationId} supported={supported} />
      ),
      onCallBack: (close, res) => {
        console.log(res);
        if (res)
          setSearchFilter({
            ...searchFilter,
            reload: searchFilter.reload ? searchFilter.reload + 1 : 1,
          });
        if (close) pageCloseDialogAction({ page: "SupportedRegister" });
      },
    });
  };
  return (
    <div>
      <Loading
        loading={isSaving}
        background="radial-gradient(rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.1))"
        loaderColor="#3498db"
      />
      <Row className="mb-4">
        <Colxx sm="12" md="12" lg="12" color="success">
          {relationId ? (
            <ButtonDropdown
              isOpen={isMenuNew}
              toggle={() => setIsMenuNew(!isMenuNew)}
            >
              <IconButton
                size="large"
                onClick={() => {
                  setIsMenuNew(!isMenuNew);
                }}
                title={messages["import.excel"]}
              >
                <AddOutlinedIcon color="info" fontSize="larg" />
              </IconButton>

              <DropdownMenu style={{ right: 0 }}>
                <DropdownItem
                  onClick={() => {
                    openSupported(null);
                  }}
                >
                  <IntlMessages id="app.main.cost.supported.new" />
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    openSupportedExcelImport(1);
                  }}
                >
                  <IntlMessages id="import.excel" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          ) : (
            <></>
          )}
          {"  "}
          <IconButton
            size="large"
            onClick={openSearchDialog}
            title={messages["export.excel"]}
          >
            <ContentPasteSearchIcon color="info" fontSize="larg" />
          </IconButton>
          {"  "}
          {!relationId ? (
            <IconButton
              size="large"
              onClick={() => {
                openSupportedExcelImport(2);
              }}
              title={messages["app.main.cost.supported.new.bankcard"]}
            >
              <BorderAllRoundedIcon color="info" fontSize="larg" />
            </IconButton>
          ) : (
            <></>
          )}{" "}
          <IconButton
            size="large"
            onClick={() => {
              var exportData = items.map((item) => {
                return {
                  reg: item.relation.reg,
                  address: item.supported.address,
                  relation: item.relation.relation,
                  name: item.supported.name,
                  family: item.supported.family,
                  mobile: item.supported.mobile,
                  number: item.supported.number,
                  birth: item.supported.birth,
                  countMember: item.supported.countMember,
                  bankNumber: item.supported.bankNumber,
                  utime: item.supported.utime.substring(0, 10)
                };
              }).sort(function (a, b) {
                return (a.relation < b.relation) ? -1 : (a.relation > b.relation) ? 1 :
                  (a.reg > b.reg) ? 1 : (a.address < b.address) ? -1 : 0;
              });

              exportToCSV(
                "لیست تحت حمایت",
                exportData,
                null//, supportedImportExcelFields
              );
            }}
            title={messages["export.excel"]}
          >
            <GetAppIcon color="info" fontSize="larg" />
          </IconButton>
          <IconButton
            size="large"
            onClick={() => {
              BakerSupportedApi.ReportGroupBy(searchFilter, "address").apply().then(res => {
                console.log(res.data);
                var exportData = res.data.map((item) => {
                  const { key, ...data } = item;
                  return {
                    reg: item.key.address,
                    ...data
                  };
                });
                exportToCSV(
                  "آمار تحت حمایت",
                  exportData,
                  null//, supportedImportExcelFields
                );
              });

            }}
            title={messages["export.excel"]}
          >
            <PollIcon color="info" fontSize="larg" />
          </IconButton>
          {selectedIds.length > 0 && (
            <>
              {"  "}
              <ButtonDropdown
                isOpen={isMenuGroup}
                toggle={() => setIsMenuGroup(!isMenuGroup)}
              >
                <IconButton
                  size="large"
                  onClick={() => {
                    setIsMenuGroup(!isMenuGroup);
                  }}
                  title={messages["group.action"]}
                >
                  <PlaylistAddCheckRoundedIcon color="info" fontSize="larg" />
                </IconButton>

                <DropdownMenu style={{ right: 0 }}>
                  <DropdownItem
                    onClick={() => {
                      openGroupEdit();
                    }}
                  >
                    <IntlMessages id="group.edit" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      openChargeAction();
                    }}
                  >
                    <IntlMessages id="app.main.cost.recharge.req" />
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>

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
          `super-app-theme--${params.row.supported.stateId}`
        }
      />
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return { region1s };
};

export default injectIntl(connect(mapStateToProps, {})(SupportedList));
