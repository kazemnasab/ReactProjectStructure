import React from "react";
import { injectIntl } from "react-intl";

import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "features/repositories/methods";
import { BakerSupportedChargeApi, BakerRelationApi, } from "../../repositories";
import { ConstantApi } from "features/repositories";
import { DialogContext } from "providers/context/contexts";
import { connect } from "react-redux";
import * as Region1Selector from "redux/region1/selector";
import { getCurrentUser } from "helpers/Utils";
import Loading from "react-fullscreen-loading";
import ChargeListItem from "./DocumentItem";
import { Button, FormGroup, Input, Label, Row } from "reactstrap";

const SupportedList = (props) => {
  const { pageCloseDialogAction, pageOpenDialogAction} =
    React.useContext(DialogContext);
  const { intl, region1s, relationId = null } = props;
  const [searchFilter, setSearchFilter] = React.useState(
    relationId ? { relations: [relationId] } : null
  );
  const [isSaving, setIsSaving] = React.useState(false);
  const [checkedList, setCheckedList] = React.useState([]);
  React.useEffect(() => { }, []);
  const currentUser = getCurrentUser();
  const { messages } = intl;
  const loadSupporteds = useApiMyCustomFetch(
    BakerSupportedChargeApi.Documents({}),
    1
  );

  const [items, dispatchSupportedItems] = useCustomListReducer({
    initialArg: loadSupporteds.data,
    key: currentUser.id,
  });

  const print = () => {
    window.open(
      "/print/document/" + checkedList.map(m => m.id),
      "winname",
      "directories=no,titlebar=no,addressbar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=700,height=800"
    );
  }

  return (
    <div>
      <Row className="mb-2">
        <FormGroup className="mb-2" check>
          
          <Button onClick={print}>چاپ لیست</Button>
        </FormGroup>
      </Row>
      <Loading
        loading={isSaving}
        background="radial-gradient(rgba(250, 250, 250, 0.1), rgba(250, 250, 250, 0.1))"
        loaderColor="#3498db"
      />
      <div className="row">
        {items.map((document) => {
          return <ChargeListItem document={document} onChecked={(checked) => {
            if (checked) setCheckedList([...checkedList, { id: document.id }]);
            else setCheckedList(checkedList.filter(m => m.id != document.id));
          }} />;
        })}
      </div>
    </div>
  );
};
const mapStateToProps = (state, { targets }) => {
  const region1s = Region1Selector.selectItemsSearch(state, "");
  return { region1s };
};

export default injectIntl(connect(mapStateToProps, {})(SupportedList));
