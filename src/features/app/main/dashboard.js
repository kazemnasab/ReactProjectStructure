import React from "react";
import { injectIntl } from "react-intl";
import urls from "./dashboard_items";
import Dashboard from "features/components/dashboard/dashboard";
import Breadcrumb from "features/app/components/layout/Breadcrumb";

const Index = ({ intl }) => {
  return (
    <>
      <Breadcrumb breadcrumb={["app.home", "app.main.cost.home"]} />
      <Dashboard urls={urls} />
    </>
  );
};

export default injectIntl(Index);
