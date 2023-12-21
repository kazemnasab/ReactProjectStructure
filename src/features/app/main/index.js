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

const Relation = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./relation")
);
const Charge = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./charge")
);
const Supported = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./supported")
);

function Index() {
  return (
    <Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/charge/*" element={<Charge />} />
        <Route path="/relation/*" element={<Relation />} />
        <Route path="/supported/*" element={<Supported />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="home" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Index;
