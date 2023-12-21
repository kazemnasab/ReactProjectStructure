import * as React from "react";
import { Row, Input, Label, Button, Col } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { DialogContext } from "providers/context/contexts";
import CustomButton from "./CustomButton";
import CustomDataGrid from "./CustomDataGrid";

function CustomMultiSelectableCombo(props) {
  const {
    intl,
    options,
    columns,
    selectedItems,
    returnResult,
    enabled = true,
    title = "title"
  } = props;

  const { pageCloseDialogAction, pageOpenDialogAction } =
    React.useContext(DialogContext);

  const { messages } = intl;
  const defaultCols = [
    {
      field: "label",
      headerName: messages[title],
      width: 230,
    }];
  const [selectedIds, setSelectedIds] = React.useState([]);

  React.useEffect(() => {
    console.log(selectedItems);
    if (selectedItems)
      setSelectedIds(selectedItems.map(m => m.value));
  }, [selectedItems]);



  const okClick = React.useCallback(() => {
    pageCloseDialogAction({
      page: "CustomMultiSelectableCombo",
    });
    returnResult(selectedIds);

  }, [selectedIds]);

  const onChecked = React.useCallback((ids) => {
    setSelectedIds(ids);
  }, []);

  React.useEffect(() => { console.log(options) }, []);

  return (
    <>
      <CustomDataGrid
        indexer_width={0}
        rows={options.map(m => { return { ...m, id: m.value } })}
        columns={columns ?? defaultCols}
        pagination
        rowsPerPageOptions={[5]}
        pageSize={100}
        checkboxSelection
        selectedIds={selectedIds}
        onSelectionModelChange={onChecked}
      />
      <Row className="mt-2">
        <Col md={6}>
          <CustomButton
            label="select"
            btnClass="primary"
            width="100%"
            onClick={okClick}
          />
        </Col>
        <Col md={6}>
          <CustomButton
            label="cancel"
            btnClass="label-danger"
            width="100%"
            onClick={() => pageCloseDialogAction({
              page: "CustomMultiSelectableCombo",
            })}
          />
        </Col>
      </Row>
    </>
  );
}

export default injectIntl(CustomMultiSelectableCombo);