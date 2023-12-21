import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLinkOperator,
} from "@mui/x-data-grid";
import { Badge } from "reactstrap";
import CustomNoRowsOverlay from "features/components/common/CustomNoRowsOverlay";
import CustomPagination from "features/components/common/CustomPagination";
import { Box } from "@mui/material";
import { injectIntl } from "react-intl";

import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

const createReactClass = (params, onRowDoubleClick) => {
  return (
    <Badge
      className="btnedit cursor-hand"
      onClick={() => {
        onRowDoubleClick(params.row);
      }}
    >
      Edit
    </Badge>
  );
};

const CustomDataGrid = (props) => {
  const {
    rows,
    editLink,
    onRowDoubleClick,
    pageSize,
    columns,
    checkboxSelection,
    getRowClassName,
    intl,
    loading = false,
    onSelectionModelChange,
    selectedIds,
    indexer_width = 80,
    onInitNewRow,
    onSearchDialog,
    rowstyles,
    rowHeight = 35,
    editMode,
    experimentalFeatures,
  } = props;
  const rowColumn = [
    {
      field: "row",
      headerName: "#",
      width: indexer_width,
    },
  ];
  const { messages } = intl;
  const editColumn = [
    {
      field: "action",
      headerName: "ویرایش",
      width: 130,
      renderCell: (params) => {
        return createReactClass(params, onRowDoubleClick);
      },
    },
  ];

  const QuickSearchToolbar = () => {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        {onInitNewRow && (
          <IconButton
            size="large"
            style={{ marginTop: -5 }}
            onClick={() => {
              onInitNewRow();
            }}
          >
            <AddOutlinedIcon color="info" fontSize="larg" />
          </IconButton>
        )}
        {onSearchDialog && (
          <IconButton
            size="large"
            style={{ marginTop: -5 }}
            onClick={() => {
              onSearchDialog();
            }}
          >
            <ContentPasteSearchIcon color="info" fontSize="larg" />
          </IconButton>
        )}
        <GridToolbarQuickFilter
          placeholder={messages["search.input"]}
          style={{ fontFamily: "inherit !important" }}
          quickFilterParser={(searchInput) =>
            searchInput
              .split(",")
              .map((value) => value.trim())
              .filter((value) => value !== "")
          }
        />
      </Box>
    );
  };

  const [selectionModel, setSelectionModel] = useState(selectedIds);
  useEffect(() => {
    setSelectionModel(selectedIds);
  }, [selectedIds]);
  const [cols, setCols] = useState(rowColumn);
  const [items, setItems] = useState([]);
  useEffect(() => {
    setCols(rowColumn.concat(columns));
    if (editLink) setCols(rowColumn.concat(columns).concat(editColumn));
    setItems(
      rows.map((item, index) => {
        return { ...item, row: index + 1 };
      })
    );
  }, [rows]);

  
  return (
    <Box
      sx={{
        ...rowstyles,
        height: 500,
        width: "100%",
        fontFamily: "inherit !important",
      }}
    >
      <DataGrid
        {...props}
        style={{ fontFamily: "inherit !important" }}
        rows={items}
        rowHeight={rowHeight}
        onRowDoubleClick={(row, event) => {
          if (onRowDoubleClick) onRowDoubleClick(row.row);
        }}
        onCellDoubleClick={(params, event) => {
          if (!event.ctrlKey) {
            event.defaultMuiPrevented = true;
          }
        }}
        columns={cols}
        pageSize={pageSize}
        components={{
          Pagination: CustomPagination,
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: QuickSearchToolbar,
        }}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        onSelectionModelChange={(ids) => {
          if (onSelectionModelChange) onSelectionModelChange(ids);
        }}
        loading={loading}
        selectionModel={selectionModel}
        rowsPerPageOptions={[pageSize]}
        checkboxSelection={checkboxSelection}
        getRowClassName={getRowClassName}
        editMode={editMode}
        experimentalFeatures={experimentalFeatures}
      />
    </Box>
  );
};

export default injectIntl(React.memo(CustomDataGrid));
