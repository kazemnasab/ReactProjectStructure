import * as React from "react";
import { Row, Input, Label, Button } from "reactstrap";
import { injectIntl } from "react-intl";
import { DialogContext } from "providers/context/contexts";
import { useQuery } from "react-query";
import CustomDataGrid from "./CustomDataGrid";
import CustomButton from "./CustomButton";

function CustomSelectableCombo(props) {
  const {
    api,
    renderResult,
    title = "profile.select",
    key = '',
    rows,
    columns,
    selectedItems,
    onSelectionChange,
    enabled = true,
    target = null,
  } = props;
  const { pageCloseDialogAction, pageOpenDialogAction } =
    React.useContext(DialogContext);

  const [selectedIds, setSelectedIds] = React.useState(selectedItems);
  const [text, setText] = React.useState([]);

  const {
    data: data,
    isLoading: isLoading,
    error: errorLoading,
  } = useQuery(
    `CustomSelectableCombo${key}`,
    api ? () =>
      api.then((res) => {
        return renderResult(res.data);
      }) : () => { },
    {}
  );

  const returnResult = React.useCallback(() => {
    console.log(selectedIds);
    pageCloseDialogAction({
      page: key,
    });
    //onSelectionChange(selectedIds);
  }, [selectedIds])
  return (
    <>
      <Input
        {...props}
        readOnly={true}
        value={(rows ?? data).filter(m => selectedIds.includes(m.id)).reduce((prev, current) => { return (prev ?? "") + (prev ? " / " : "") + current.label; }, null)}
        onClick={() => {
          onSelectionChange([]);
          if (enabled)
            pageOpenDialogAction({
              page: key,
              size: "md",
              title: [title],
              child: <>
                <CustomDataGrid
                  height={500}
                  indexer_width={25}
                  rows={rows ?? data}
                  columns={columns}
                  pagination
                  rowsPerPageOptions={[5]}
                  pageSize={100}
                  checkboxSelection
                  //selectedIds={selectedItems}
                  onSelectionModelChange={(ids) => {
                    //console.log(ids);
                    setSelectedIds(ids);
                    onSelectionChange(ids);
                  }}
                  loading={isLoading}
                />
                <div className="mt-2">
                  <CustomButton
                    label="select"
                    btnClass="primary"
                    width="100%"
                    onClick={() => {
                      returnResult();
                    }}
                  />
                </div>
              </>,
              onCallBack: (close, res) => {
                pageCloseDialogAction({
                  page: key,
                });
              },
            });
        }}
      />
    </>
  );
}


export default injectIntl(CustomSelectableCombo);
