import React from "react";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "helpers/Utils";
import { injectIntl } from "react-intl";
import ChargeDocument from "../components/ChargeDocument";

const CardDeliver = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./card_deliver")
);

const Index = () => {
  return (
    <Routes>
      <Route path="/:id" element={<ChargeDocument />} />
    </Routes>
  );
};

export default injectIntl(Index);
