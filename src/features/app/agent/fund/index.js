import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const List = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./list")
);

const CreateOrUpdate = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./createOrUpdate")
);

function Index() {
  return (
    <React.Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/list" element={<List />} />
        <Route path="/list/:state" element={<List />} />
        <Route path="/new" element={<CreateOrUpdate />} />
        <Route path="/edit/:id" element={<CreateOrUpdate />} />
        <Route path="/*" element={<Navigate to="new" replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
