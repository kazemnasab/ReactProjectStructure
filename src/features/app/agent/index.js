import React, { Suspense, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./assets/css/index.css"

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./dashboard")
);

const Fund = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./fund")
);

const Bill = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./bill")
);

function Index() {
  return (
    <Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/fund/*" element={<Fund />} />
        <Route path="/bill/*" element={<Bill />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Index;
