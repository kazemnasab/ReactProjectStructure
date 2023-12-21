import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { setCurrentUser } from "helpers/Utils";
import { injectIntl } from "react-intl";

const Login = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./login")
);

const Index = ({ intl }) => {
  const { messages, currentUser } = intl;
  React.useEffect(() => {
    setCurrentUser(null);
  }, [currentUser]);
  return (
    <React.Suspense fallback={<div className="loading" >loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/user/login" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default injectIntl(Index);
