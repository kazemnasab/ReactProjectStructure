import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const CreateOrUpdate = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./createOrUpdate")
);

function Index() {
  return (
    <React.Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/:serial" element={<CreateOrUpdate />} />
        <Route path="/*" element={<CreateOrUpdate />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
