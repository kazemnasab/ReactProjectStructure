import IntlMessages from "helpers/IntlMessages";
import React from "react";
import Select from "react-select";
import { injectIntl } from "react-intl";
import { Card, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";

import Breadcrumb from "features/app/components/layout/Breadcrumb";
import ChargeList from "features/app/main/charge/components/ChargeList";

const Index = (props) => {
  const { states } = props;
  const { id, stateId } = useParams();
  React.useEffect(()=>{
  },[]);
  return (
    <div>
      <Breadcrumb
        breadcrumb={[
          "app.home",
          "app.main.cost.home",
          "app.main.cost.charge.req",
        ]}
      />
      <Card>
        <CardBody>
          <ChargeList
            documentId={id}
            states={states ?? (stateId ? [stateId] : [])}
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default injectIntl(Index);
