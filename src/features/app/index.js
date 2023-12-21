import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/index";
import { DialogContext } from "providers/context/contexts";
import "./assets/css/css.css";
import {
  getRegion1List,
} from "redux/actions";
import { connect } from "react-redux";

const AgentHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./agent/index")
);

const MainHome = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./main/index")
);

function Index(props) {
  const { getRegion1ListAction } = props;
 
  React.useEffect(()=>{
    getRegion1ListAction({});
  },[getRegion1ListAction]);

  const [dialogs, setDialogs] = React.useState([]);

  const pageOpenDialogAction = (dialog) => {
    setDialogs([...dialogs, { ...dialog, type: "dialog" }]);
  }
  const pageCloseDialogAction = (dialog) => {
    setDialogs(dialogs.filter(
      (m) => m.page != dialog.page && m.type == "dialog"
    ));
  }
  
  return (
      <DialogContext.Provider
        value={{
          dialogs,
          pageCloseDialogAction,
          pageOpenDialogAction,
        }}
      >
        <AppLayout>
          <Suspense fallback={<div class="loading">Loading</div>}>
            <Routes>
              <Route path="/main/*" element={<MainHome />} />
              <Route path="/agent/*" element={<AgentHome />} />
              <Route
                path="/"
                element={<Navigate to="/app/agent/home" replace />}
              />
            </Routes>
          </Suspense>
        </AppLayout>
      </DialogContext.Provider>
  );
}


export default connect(null, {
  getRegion1ListAction: getRegion1List,
})(Index);
