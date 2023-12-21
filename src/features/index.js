import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "helpers/Utils";
import { connect } from "react-redux";

const Home = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./app/index")
);

const User = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./user/index")
);

const Print = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./print/index")
);

const currentUser = getCurrentUser();

function Index({}) {
  React.useEffect(() => {
    //console.log(currentUser);
  }, []);

  return (
      <React.Suspense fallback={<div className="loading" >loading...</div>}>
        <Routes>
          {currentUser && <Route path="/app/*" element={<Home />} />}
          {currentUser && <Route path="/print/*" element={<Print />} />}
          <Route path="/*" element={<Navigate to="/user" replace />} />
          <Route path="/user/*" element={<User />} />
        </Routes>
      </React.Suspense>
  );
}

export default connect(null, {})(Index);
