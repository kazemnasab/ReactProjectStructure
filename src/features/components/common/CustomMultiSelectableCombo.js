import * as React from "react";
import { Row, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { connect } from "react-redux";
import { DialogContext } from "providers/context/contexts";
import CustomButton from "./CustomButton";
import CustomDataGrid from "./CustomDataGrid";
import CustomMultiSelectableComboGrid from "./CustomMultiSelectableComboGrid";

function CustomMultiSelectableCombo(props) {
  const {
    enabled = true,
    options,
    columns,
    selectedItems,
    title = "title",
  } = props;

  const { pageCloseDialogAction, pageOpenDialogAction } =
    React.useContext(DialogContext);


  return (
    <>
      <Input
        value={selectedItems ? options.filter(op => selectedItems.map(m => m.value).includes(op.value)).reduce((prev, current) => { return prev ? prev + " / " + current.label : current.label }, "") : ""}
        {...props}
        readOnly={true}
        onClick={() => {
          if (enabled)
            pageOpenDialogAction({
              page: "CustomMultiSelectableCombo",
              size: "md",
              backdrop: "static",
              toggle: () => {
                pageCloseDialogAction({
                  page: "CustomMultiSelectableCombo",
                });
              },
              child: <CustomMultiSelectableComboGrid {...props} />,
              onCallBack: (close, res) => {
                pageCloseDialogAction({
                  page: "CustomMultiSelectableCombo",
                });
              }
            });
        }}
      />
    </>
  );
}

export default injectIntl(CustomMultiSelectableCombo);
