import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const List = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./list")
);
const Log = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./loged")
);

function Index() {
  return (
    <React.Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/log/:id" element={<Log />} />
      </Routes>
    </React.Suspense>
  );
}

export default Index;
