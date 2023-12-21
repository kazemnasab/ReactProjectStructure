import { Colxx, Separator } from "features/components/bootstrap/CustomBootstrap";
import React from "react";
import { injectIntl } from "react-intl";
import {
  Row,
  Card,
  CardBody,
} from "reactstrap";
import { useCustomListReducer } from "helpers/core";
import { useApiMyCustomFetch, useApiCustomQuery } from "features/repositories/methods";
import { BakerRelationApi } from "../../repositories";
import { IconButton } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import List from "features/app/main/relation/components/List";
import { getCurrentUser } from "helpers/Utils";
import RelationRegister from "./RelationRegister";
import { DialogContext } from "providers/context/contexts";

const Index = (props) => {
  const { pageCloseDialogAction, pageOpenDialogAction} =
    React.useContext(DialogContext);
  const { intl } = props;
  const [reload, setReload] = React.useState(0);
  const { messages } = intl;

  const loadRelations = useApiMyCustomFetch(
    BakerRelationApi.Get({ target: "Donation2", stateId: 5 }),
    reload
  );

  const [items, dispatchRelationItems] = useCustomListReducer({
    initialArg: loadRelations.data,
    key: reload,
  });

  const openRelation = (relation) => {
    pageOpenDialogAction({
      page: "RelationRegister",
      title: ["app.main.cost.relation"],
      size: "md",
      child: <RelationRegister relation={relation} />,
      onCallBack: (close, res) => {
        console.log(res);
        if (res) setReload(reload + 1);
        if (close) pageCloseDialogAction({ page: "RelationRegister" });
      },
    });
  };

  return (
    <Card>
      <CardBody>
        {true && (
          <Row className="mb-4">
            <Colxx sm="12" md="2" lg="2" color="success">
              <IconButton
                size="large"
                onClick={() => {
                  openRelation(null);
                }}
                title={messages["app.saleservice.fund.new"]}
              >
                <AddOutlinedIcon color="info" fontSize="larg" />
              </IconButton>
            </Colxx>
          </Row>
        )}
        <List
          dispatchItemChange={dispatchRelationItems}
          items={items}
          loading={loadRelations.isLoading}
          onRowDoubleClick={(item) => {
            openRelation(item);
          }}
        />
      </CardBody>
    </Card>
  );
};


export default injectIntl(Index);
