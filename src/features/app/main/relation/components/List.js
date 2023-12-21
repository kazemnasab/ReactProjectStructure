import React, { useEffect } from "react";
import { injectIntl } from "react-intl";
import moment from "jalali-moment";
import { connect } from "react-redux";
import * as RoutSelector from "redux/rout/selector";
import * as Region1Selector from "redux/region1/selector";
import CustomDataGrid from "features/components/common/CustomDataGrid";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { ConstantApi } from "features/repositories";import AsyncCell from "features/components/async/AsyncCell";

const RelationList = (props) => {
  const navigate = useNavigate();
  const { intl, items, region1s } = props;
  const { messages } = intl;
  const {
    data: typeSupports,
    isLoading: isLoadingTypeSupports,
    error: errorTypeSupports,
  } = useQuery(
    "TypeSupport",
    () =>
      ConstantApi.Get({ target: "TypeSupportDonate2" })
        .apply()
        .then((res) => {
          return res.data.map((item) => {
            return { label: item.title, value: item.id };
          });
        }),
    {}
  );
  const columns = [
    {
      field: "number",
      headerName: messages["profile.code"],
      width: 60,
      editable: true,
    },
    {
      field: "reg1",
      headerName: messages["donation.fund.rout"],
      width: 170,
      valueGetter: (params) => {
        if (params.row.reg1Id) {
          var cs = region1s.find((m) => m.id == params.row.reg1Id);
          if (cs) return cs.code;
        } else return params.row.reg1Id + "";
      },
    },
    {
      field: "name",
      headerName: messages["profile.firstname"],
      width: 150,
      editable: true,
      valueGetter: (params) => {
        return params.row.name;
      },
    },
    {
      field: "typeSupport",
      headerName: messages["profile.type.supports"],
      width: 170,
      renderCell: (params) => {
        return (
          <AsyncCell
            loadData={async () => {
              if (params.row.typeSupport && !isLoadingTypeSupports) {
                var cs = typeSupports.find(
                  (m) => m.value == params.row.typeSupport
                );
                if (cs) return await { data: cs.label };
              }
              return await { data: "" };
            }}
            valueGetter={(price) => price}
          />
        );
      },
      renderCell3: (params) => {
        return (
          <AsyncCell
            loadData={async () => {
              return 1;
            }}
          />
        );
        return isLoadingTypeSupports;
        if (params.row.typeSupport && !isLoadingTypeSupports) {
          var cs = typeSupports.find((m) => m.id == params.row.typeSupport);
          if (cs) return cs.title;
        } else return params.row.typeSupport + "";
      },
    },
    {
      field: "comment",
      headerName: messages["profile.comment"],
      width: 150,
      editable: true,
    },
    {
      field: "mobile",
      headerName: messages["profile.mobile"],
      width: 110,
      editable: true,
    },
    {
      field: "address",
      headerName: messages["profile.address"],
      sortable: false,
      width: 300,
    },
    {
      type: "actions",
      width: 40,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<PeopleRoundedIcon color="info" />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              navigate(`${params.row.id}`);
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
  const routs = RoutSelector.selectItemsSearch(state, 0, "");
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return {
    routs,
    region1s,
  };
};
export default injectIntl(connect(mapStateToProps, {})(RelationList));
