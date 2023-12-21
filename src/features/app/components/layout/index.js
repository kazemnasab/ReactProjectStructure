import React from "react";
import Footer from "./Footer";
import TopNav from "features/app/components/layout/TopNav.js";
import { injectIntl } from "react-intl";
import MainDialog from "features/components/pages/dialog/MainDialog";

const Index = (props) => {
  const { children, intl  } = props;
  const { messages } = intl;
  React.useEffect(() => {
    document.title = messages["app.name"];
  }, []);
  React.useEffect(
    () => {
      console.log(props);
    }, []
  )
  return (
    <>
      <MainDialog/>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            <TopNav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                {children}
              </div>
              <Footer />
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>
        <div className="layout-overlay layout-menu-toggle"></div>
        <div className="drag-target"></div>
      </div>
    </>
  );
};

export default injectIntl(Index);
