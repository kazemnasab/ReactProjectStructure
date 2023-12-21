import IntlMessages from "helpers/IntlMessages";
import React from "react";
import Select from "react-select";
import { injectIntl } from "react-intl";
import {
  Card,
  CardBody,
} from "reactstrap";
import { useParams } from "react-router-dom";

import FundRegister from "features/app/agent/fund/components/FundRegister";
import Breadcrumb from "features/app/components/layout/Breadcrumb";
import SupportedList from "features/app/main/supported/components/SupportedList";


const Index = ({ intl }) => {
  const { id } = useParams();
  return (
    <div>
      <Breadcrumb breadcrumb={["app.home", "app.main.cost.home", "app.main.cost.supported"]} />
      <Card>
        <CardBody>
          <SupportedList cardexId={id ?? 0} />
        </CardBody>
      </Card>
    </div>
  );
};
export default injectIntl(Index);
