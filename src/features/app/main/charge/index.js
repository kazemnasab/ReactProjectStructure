import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Documents = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./documents")
);
const Charges = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./charges")
);

function Index() {
  return (
    <React.Suspense fallback={<div className="loading">loading...</div>}>
      <Routes>
        <Route path="/" element={<Documents />} />
        <Route path="/:id/error" element={<Charges states={[50, 130]}/>} />
        <Route path="/:id/:stateId" element={<Charges/>} />
        <Route path="/:id" element={<Charges />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
