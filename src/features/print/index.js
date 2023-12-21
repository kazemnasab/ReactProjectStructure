import React from "react";
import { Routes, Route } from "react-router-dom";
import { injectIntl } from "react-intl";

const Supported = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./supported")
);

const Document = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./document")
);

const Index = ({ intl }) => {
  React.useEffect(() => {
    //window.print();
  }, []);
  return (
    <Routes>
      <Route path="/supported/*" element={<Supported />} />
      <Route path="/document/*" element={<Document />} />
    </Routes>
  );
};

export default injectIntl(Index);
