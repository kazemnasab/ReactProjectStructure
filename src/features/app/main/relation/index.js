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
        <Route path="/new" element={<CreateOrUpdate />} />
        <Route path="/:id" element={<CreateOrUpdate />} />
        <Route path="/" element={<List />} />
        <Route path="/*" element={<List to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
